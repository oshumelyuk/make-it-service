import companiesService from '../dal/companiesService';
import resposeWriter from '../utils/resposeWriter';
import companyValidator from '../validators/companyValidator';

export default function companiesController() {

    const get = function(req, resp, next){
        const id = req.params.id;
        return companiesService().getAll().then(data => companies.find(x => x.id == id));
    };

    const create = function(req, resp, next){
        var company = req.body;
        let validateResult = companyValidator.validate(company);
        if (!validateResult.isValid){
            return validateResult;
        }
        companiesService().create(company);
    };

    const remove = function(req, resp, next){
        const id = req.params.id;
        const companies = companiesService().getAll();
        let idx = companies.findIndex(x => x.id == id);
        companies.splice(idx, idx);
    };

    const list = function (req, resp, next) {
        const companies = companiesService().getAll();
        return companies;
    };

    return {
      //  get: (...args) => resposeWriter(get, ...args),
        // create: (...args) => resposeWriter(create, ...args),
        // delete: (...args) => resposeWriter(remove, ...args),
         list: (...args) => resposeWriter(list, ...args)
    };
};
