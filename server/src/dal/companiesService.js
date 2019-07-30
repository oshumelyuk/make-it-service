import fs from 'fs';
import path from 'path';

export default function companiesService() {

    let db = undefined;

    const readDataFromDatabase = () => {
        if (db) return db;

        let filePath = path.join(__dirname, 'db.json');
        let dbContent = fs.readFileSync(filePath);
        return JSON.parse(dbContent);
    }

    const writeDataToDatabase = () => {
        var dbContent = JSON.stringify(db);
        let filePath = path.join(__dirname, 'db.json');
        fs.writeFileSync(filePath, dbContent);
    }

    return {
        getAll: () => { 
            db = readDataFromDatabase();
            return db.companies;
        },
        create: (company) => {
            db = readDataFromDatabase();
            db.companies.push(company);
            writeDataToDatabase();
        }
    }
};
