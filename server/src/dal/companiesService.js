import database from "./database";

export default function companiesService() {
  var db = database();
  return {
    getAllAsync: async () => {
      let data = await db.readDataFromDatabaseAsync();
      return data.companies;
    },
    getByIdAsync: async id => {
      let data = await db.readDataFromDatabaseAsync();
      return data.companies.find(x => x.id == id);
    },
    createAsync: async company => {
      let data = await db.readDataFromDatabaseAsync();
      data.companies.push(company);
      await db.writeDataToDatabaseAsync(data);
    },
    removeAsync: async id => {
      const data = await db.readDataFromDatabaseAsync();
      let idx = data.companies.findIndex(x => x.id == id);
      data.companies.splice(idx, idx);
      await db.writeDataToDatabaseAsync(data);
    }
  };
}
