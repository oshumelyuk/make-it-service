import RepositoryBase from "./RepositoryBase";
import { ObjectID } from "mongodb";

class ReviewsRepository extends RepositoryBase {
  constructor() {
    super("reviews");
    this.collectionName = "reviews";
  }

  async getByCompanyIdAsync(companyId) { 
    let data = await this.db.filterEntitiesAsync(this.collectionName, { companyId : new ObjectID(companyId)});
    return data;
  }
}

export default ReviewsRepository;
