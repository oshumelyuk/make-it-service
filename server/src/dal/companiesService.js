import database from './database';

export default function companiesService() {

    var db = database();
    return {
        getAll: () => { 
            let data = db.readDataFromDatabase();
            return data.companies;
        },
        create: (company) => {
            let data = db.readDataFromDatabase();
            data.companies.push(company);
            db.writeDataToDatabase(data);
        }
    }
};
