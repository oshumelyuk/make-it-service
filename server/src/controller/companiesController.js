import companiesService from '../dal/companiesService';
import resposeWriter from '../utils/resposeWriter';

export default function companiesController() {

    let get = function(req, resp, next){
        const id = req.params.id;
        const companies = companiesService().getAll();
        return companies.find(x => x.id == id);
    };

    let create = function(req, resp, next){
        throw new Error('Method not implemented');
    };

    let remove = function(req, resp, next){
        const id = req.params.id;
        const companies = companiesService().getAll();
        let idx = companies.findIndex(x => x.id == id);
        companies.splice(idx, idx);
    };

    let list = function (req, resp, next) {
        const companies = companiesService().getAll();
        return companies;
    };

    return {
        get: (...args) => resposeWriter(get, ...args),
        create: (...args) => resposeWriter(create, ...args),
        delete: (...args) => resposeWriter(remove, ...args),
        list: (...args) => resposeWriter(list, ...args)
    };

};
