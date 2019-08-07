import { MongoClient, ObjectID } from "mongodb";

export default function database() {
  const dbName = "make-it-service";

  const getClient = async () => {
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

  const filterEntitiesAsync = async (collectionName, filter) => { 
    let client = await getClient();
    let db = client.db(dbName);
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .find(filter)
        .toArray((err, items) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(items);
          client.close();
        });
    });
  };

  return {
     getEntitiesAsync: (collectionName) => { return filterEntitiesAsync(collectionName, {}); },
    //getEntitiesAsync: filterEntitiesAsync.bind(this, collectionName, {}),
    filterEntitiesAsync,
    getEntityAsync: async (collectionName, entityId) => {
      let client = await getClient();
      let db = client.db(dbName);
      let objectId = new ObjectID(entityId);
      return new Promise((resolve, reject) => {
        db.collection(collectionName)
          .find({ _id: objectId })
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
      let client = await getClient();
      let db = client.db(dbName);
      return new Promise((resolve, reject) => {
        db.collection(collectionName).insertOne(entity, (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(response);
          client.close();
        });
      });
    },
    updateEntityAsync: async (collectionName, entityId, fieldSet) => {
      let client = await getClient();
      let db = client.db(dbName);
      let objectId = new ObjectID(entityId);
      return new Promise((resolve, reject) => {
        db.collection(collectionName)
          .updateOne({ _id: objectId }, { $set: fieldSet }, { upsert: true }, (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(response);
          client.close();
        });
      });
    },
    removeEntityAsync: async (collectionName, entityId) => {
      let client = await getClient();
      let db = client.db(dbName);
      return new Promise((resolve, reject) => {
        db.collection(collectionName).deleteOne({ Id: entityId }, function(err, response) {
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
