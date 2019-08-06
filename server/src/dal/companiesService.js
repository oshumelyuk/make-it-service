import database from "./database";

export default function companiesService() {
  const collectionName = "companies";
  var db = database();
  return {
    getAllAsync: async () => {
      let data = await db.getEntitiesAsync(collectionName);
      return data;
    },
    getByIdAsync: async id => {
      let data = await db.getEntityAsync(collectionName, id);
      return data;
    },
    createAsync: async company => {
      await db.insertEntityAsync(collectionName, data);
    },
    removeAsync: async id => {
      await db.removeEntityAsync(collectionName, id);
    }
  };
}
