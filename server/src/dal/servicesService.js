import database from "./database";

export default function companiesService() {
  const collectionName = "services";
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
    createAsync: async service => {
      await db.insertEntityAsync(collectionName, service);
    },
    removeAsync: async id => {
      await db.removeEntityAsync(collectionName, id);
    }
  };
}
