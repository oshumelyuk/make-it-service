import servicesService from '../dal/servicesService';
import companiesService from '../dal/companiesService';
import resposeWriter from '../utils/resposeWriter';

export default function servicesController() {

    let getForCompany = function(req, resp, next){
        const id = req.params.id;
        const companies = companiesService().getAll();
        const services = servicesService().getAll();
        return companies.find(x => x.id == id).services.map(serviceId => services.find(x => x.id == serviceId));
    };

    let list = function (req, resp, next) {
        const services = servicesService().getAll();
        return services;
    };

    return {
        getForCompany: (...args) => resposeWriter(getForCompany, ...args),
        list: (...args) => resposeWriter(list, ...args)
    };

};
