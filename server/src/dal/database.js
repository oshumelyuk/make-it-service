import fs from 'fs';
import path from 'path';
import { resolve } from 'dns';

export default function database() {

    let dbCache = undefined;

    return {
        readDataFromDatabase: () => {
            if (dbCache) return dbCache;
    
            let filePath = path.join(__dirname, 'db.json');
            let dbContent = fs.readFileSync(filePath);
            dbCache = JSON.parse(dbContent);
            return dbCache;
        }, 
        writeDataToDatabase: (data) => {
            let dbContent = JSON.stringify(data, null, 4);
            let filePath = path.join(__dirname, 'db.json');
            fs.writeFileSync(filePath, dbContent);
        },
        readDataFromDatabaseAsync:  () => {
            if (dbCache) return dbCache;
    
            let filePath = path.join(__dirname, 'db.json');
            return new Promise((resolve, reject) => {
                fs.readFile(filePath,'utf8', (err, data)=> {
                    dbCache = JSON.parse(data);
                    resolve(dbCache);
                });
            });
            console.log(dbContent);
            // dbCache = JSON.parse(dbContent);
            // return dbCache;
        }
    } 
}