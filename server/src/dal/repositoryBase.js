import database from "./database";

class RepositoryBase {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.db = database();
  }

  async getAllAsync() {
    let data = await this.db.getEntitiesAsync(this.collectionName);
    return data;
  }
  async getByIdAsync(id) {
    let data = await this.db.getEntityAsync(this.collectionName, id);
    return data;
  }
  async createAsync(service) {
    await this.db.insertEntityAsync(this.collectionName, service);
  }
  async removeAsync(id) {
    await this.db.removeEntityAsync(this.collectionName, id);
  }
}

export default RepositoryBase;
