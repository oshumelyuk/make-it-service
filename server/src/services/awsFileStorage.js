import { AWS } from "aws-sdk";

class AwsFileStorage {
  constructor(accessKeyId, secretAccessKey) {
    this.bucket = "make-it-service";
    AWS.config.update({
      accessKeyId,
      secretAccessKey
    });
  }

  async getFileAsync(container, name, writeStream) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: this.bucket,
      Key: `${container}/${name}`
    };

    return new Promise((resolve, reject) => {
      var readStream = s3.getObject(params).createReadStream();
      readStream.pipe(writeStream);
      readStream.on("end", function() {
        resolve();
      });
    });
  }

  async saveFileAsync(container, name, dataStream) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: this.bucket,
      Body: dataStream,
      Key: `${container}/${name}`
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, function(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
}

export default AwsFileStorage;
