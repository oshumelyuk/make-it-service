import ServicesRepository from "../dal/servicesRepository";
import CompaniesRepository from "../dal/companiesRepository";
import resposeWriter from "../utils/resposeWriter";
import serviceValidator from "../validators/serviceValidator";

export default function servicesController() {

  const servicesRepository = new ServicesRepository();
  const companiesRepository = new CompaniesRepository();

  const getForCompanyAsync = async (req, resp, next) => {
    const id = req.params.id;
    let [company, services] = await Promise.all([companiesRepository.getByIdAsync(id), servicesRepository.getAllAsync()]);
    if (!company) {
      return null;
    }
    return company.services.map(serviceId => services.find(x => x._id.toString() == serviceId.toString()));
  };

  const listAsync = async (req, resp, next) => {
    const services = await servicesRepository.getAllAsync();
    return services;
  };

  const createAsync = async (req, resp, next) => {
    var service = req.body;
    let validateResult = serviceValidator.validate(service);
    if (!validateResult.isValid) {
      return validateResult;
    }
    await servicesRepository.createAsync(service);
  };

  return {
    getForCompany: (...args) => resposeWriter(getForCompanyAsync, ...args),
    list: (...args) => resposeWriter(listAsync, ...args),
    create: (...args) => resposeWriter(createAsync, ...args)
  };
}
