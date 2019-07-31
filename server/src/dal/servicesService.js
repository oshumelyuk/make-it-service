import database from './database';

export default function companiesService() {

    var db = database();
    return {
        getAll: () => { 
            let data = db.readDataFromDatabase();
            return data.services;
        },
        create: (service) => {
            let data = db.readDataFromDatabase();
            data.services.push(service);
            db.writeDataToDatabase(data);
        }
    }
};
