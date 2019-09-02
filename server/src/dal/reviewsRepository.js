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

  async createAsync(entity) {
    entity.companyId = new ObjectID(entity.companyId);
    entity.serviceId = new ObjectID(entity.serviceId);
    return await super.createAsync(entity);
  }
}

export default ReviewsRepository;
