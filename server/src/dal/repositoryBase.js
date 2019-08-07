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
  async createAsync(entity) {
    await this.db.insertEntityAsync(this.collectionName, entity);
  }
  async updateAsync(entityId, fieldSet) {
    await this.db.updateEntityAsync(this.collectionName, entityId, fieldSet);
  }
  async removeAsync(id) {
    await this.db.removeEntityAsync(this.collectionName, id);
  }
}

export default RepositoryBase;
