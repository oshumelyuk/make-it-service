import servicesService from '../dal/servicesService';
import companiesService from '../dal/companiesService';
import resposeWriter from '../utils/resposeWriter';
import serviceValidator from '../validators/serviceValidator';

export default function servicesController() {

    const getForCompany = function(req, resp, next){
        const id = req.params.id;
        const companies = companiesService().getAll();
        const services = servicesService().getAll();
        return companies.find(x => x.id == id).services.map(serviceId => services.find(x => x.id == serviceId));
    };

    const list = function (req, resp, next) {
        const services = servicesService().getAll();
        return services;
    };

    const create = function (req, resp, next) {
        var service = req.body;
        let validateResult = serviceValidator.validate(service);
        if (!validateResult.isValid){
            return validateResult;
        }
        servicesService().create(service);
    };

    return {
        // getForCompany: (...args) => resposeWriter(getForCompany, ...args),
        // list: (...args) => resposeWriter(list, ...args),
        // create: (...args) => resposeWriter(create, ...args)
    };

};
