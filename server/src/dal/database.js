import { MongoClient } from "mongodb";

export default function database() {
  const dbName = "make-it-service";

  const getClient = async databaseName => {
    if (!process.env.CONNECTION_STRING) { 
      throw new Error("Connection string is not found in env variables");
    }
    const connectionString = process.env.CONNECTION_STRING;

    return new Promise((resolve, reject) => {
      MongoClient.connect(connectionString, (err, client) => {
        if (err) {
          reject();
          return;
        }
        resolve(client.db(databaseName));
      });
    });
  };

  return {
    getEntitiesAsync: async collectionName => {
      let client = await getClient(dbName);
      return new Promise((resolve, reject) => {
        client
          .collection(collectionName)
          .find({})
          .toArray((err, items) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(items);
          });
      });
    },
    getEntityAsync: async (collectionName, entityId) => {
      let client = await getClient(dbName);
      return new Promise((resolve, reject) => {
        client
          .collection(collectionName)
          .find({ "_id": entityId })
          .toArray((err, items) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(items.length ? items[0] : undefined);
          });
      });
    },
    insertEntityAsync: async (collectionName, entity) => {
      let client = await getClient(dbName);
      return new Promise((resolve, reject) => {
        client.collection(collectionName).insertOne(entity, (err, response) => { 
          if (err) { reject(err); return; }
          resolve(response);
        });
      });
    },
    removeEntityAsync: async (collectionName, entityId) => {
      let client = await getClient(dbName);
      return new Promise((resolve, reject) => {
        client.collection(collectionName).deleteOne({ Id: entityId }, function (err, response) {
          if (err) {
            reject(err);
            return;
          }
          resolve(response);
        });
      });
    }
  };
}
