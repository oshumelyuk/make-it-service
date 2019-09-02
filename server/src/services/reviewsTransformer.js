import { Transform } from "stream";

class ReviewsTransformer extends Transform {
  constructor(companyId, options) {
    super(options);
    this.companyId = companyId;
    this.remainings = undefined;
  }

  _transform(data, enc, callback) {
    let chunk = data.toString("utf-8");
    if (this.remainings) {
      chunk = this.remainings + chunk;
    }
    let parsed = this.extractValidReviewsArray(chunk);
    let reviewsJson = parsed.reviews;
    this.remainings = parsed.remainings;
    let result = '';
    reviewsJson.forEach(review => {
      review.companyId = this.companyId;
      review.comment = this.replaceBadWords(review.comment);
      result += "," + JSON.stringify(review);
    });
    callback(null, Buffer.from(result.substring(1)));
  }

  extractValidReviewsArray(chunk) {
    let reviews = [];
    var start = chunk.indexOf("{");
    if (!start) {
      return { reviews, remainings: chunk };
    }

    let open = 0;
    for (let i = start; i < chunk.length; i++) {
      if (chunk[i] == "{") open++;
      if (chunk[i] == "}") {
        open--;
        if (open == 0) {
          let json = this.trimChar(chunk.substring(start, i + 1).trim(), ",");
          reviews.push(JSON.parse(json));
          start = i + 1;
          i++;
        }
      }
    }
    return { reviews, remainings: chunk.substring(start) };
  }

  trimChar(string, charToRemove) {
    while (string.charAt(0) == charToRemove) {
      string = string.substring(1);
    }

    while (string.charAt(string.length - 1) == charToRemove) {
      string = string.substring(0, string.length - 1);
    }

    return string;
  }

  replaceBadWords(comment) { 
    if (!comment) return comment;
    return comment
      .replace("fuck", "f**k")
      .replace("bitch", "b**ch");
  }
}

export default ReviewsTransformer;
