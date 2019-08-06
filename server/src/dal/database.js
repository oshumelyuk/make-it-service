import { MongoClient, ObjectID } from "mongodb";

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
        resolve(client);
      });
    });
  };

  return {
    getEntitiesAsync: async collectionName => {
      let client = await getClient(dbName);
      let db = client.db(databaseName);
      return new Promise((resolve, reject) => {
        db
          .collection(collectionName)
          .find({})
          .toArray((err, items) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(items);
            close(client);
          });
      });
    },
    getEntityAsync: async (collectionName, entityId) => {
      let client = await getClient(dbName);
      let db = client.db(databaseName);
      let objectId  = new ObjectID(entityId);
      return new Promise((resolve, reject) => {
        db
          .collection(collectionName)
          .find({ "_id": objectId })
          .toArray((err, items) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(items.length ? items[0] : undefined);
            client.close();
          });
      });
    },
    insertEntityAsync: async (collectionName, entity) => {
      let client = await getClient(dbName);
      let db = client.db(databaseName);
      return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(entity, (err, response) => { 
          if (err) { reject(err); return; }
          resolve(response);
          client.close();
        });
      });
    },
    removeEntityAsync: async (collectionName, entityId) => {
      let client = await getClient(dbName);
      let db = client.db(databaseName);
      return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne({ Id: entityId }, function (err, response) {
          if (err) {
            reject(err);
            return;
          }
          resolve(response);
          client.close();
        });
      });
    }
  };
}
