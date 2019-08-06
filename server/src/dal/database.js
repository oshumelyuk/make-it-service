import fs from "fs";
import path from "path";

export default function database() {
  let dbCache = undefined;

  return {
    readDataFromDatabaseAsync: () => {
      if (dbCache) return dbCache;

      let filePath = path.join(__dirname, "db.json");
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          dbCache = JSON.parse(data);
          resolve(dbCache);
        });
      });
    },
    writeDataToDatabaseAsync: data => {
      let dbContent = JSON.stringify(data, null, 4);
      let filePath = path.join(__dirname, "db.json");
      dbCache = data;
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, dbContent, err => {
          if (!err) {
            resolve(dbCache);
          } else {
            reject(err);
          }
        });
      });
    }
  };
}
