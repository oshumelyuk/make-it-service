import fs from 'fs';
import path from 'path';

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
        }
    } 
}