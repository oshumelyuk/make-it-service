import database from './database';

export default function companiesService() {

    var db = database();
    return {
        getAllAsync: async () => {
            let data = await db.readDataFromDatabaseAsync();
            return data.services;
          },
          getByIdAsync: async id => {
            let data = await db.readDataFromDatabaseAsync();
            return data.services.find(x => x.id === id);
          },
          createAsync: async service => {
            let data = await db.readDataFromDatabaseAsync();
            data.services.push(service);
            await db.writeDataToDatabaseAsync(data);
          },
          removeAsync: async id => {
            const data = await db.readDataFromDatabaseAsync();
            let idx = data.services.findIndex(x => x.id == id);
            data.services.splice(idx, idx);
            await db.writeDataToDatabaseAsync(data);
          }
    }
};
