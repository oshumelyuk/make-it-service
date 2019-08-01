import database from './database';

export default function companiesService() {

    var db = database();
    return {
        getAll: () =>  db.readDataFromDatabaseAsync().then((data) => data.companies),
        create: (company) => {
            let data = db.readDataFromDatabase();
            data.companies.push(company);
            db.writeDataToDatabase(data);
        }
    }
};
