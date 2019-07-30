import fs from 'fs';
import path from 'path';

export default function companiesService() {

    let db = undefined;

    return {
        getAll: function getAll() { 
            if (db) return db.companies;

            let filePath = path.join(__dirname, 'db.json');
            let dbContent = fs.readFileSync(filePath);
            db = JSON.parse(dbContent);
            return db.companies;
        }
    }
};
