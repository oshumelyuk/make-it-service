import CompaniesRepository from "../dal/companiesRepository";
import resposeWriter from "../utils/resposeWriter";
import companyValidator from "../validators/companyValidator";

export default function companiesController() {

  const companiesRepository = new CompaniesRepository();

  const getAsync = async (req, resp, next) => {
    const id = req.params.id;
    var company = await companiesRepository.getByIdAsync(id);
    return company;
  };

  const createAsync = async (req, resp, next) => {
    var company = req.body;
    let validateResult = companyValidator.validate(company);
    if (!validateResult.isValid) {
      return validateResult;
    }
    await companiesRepository.createAsync(company);
  };

  const removeAsync = async (req, resp, next) => {
    const id = req.params.id;
    await companiesRepository.removeAsync(id);
  };

  const listAsync = async (req, resp, next) => {
    const companies = await companiesRepository.getAllAsync();
    return companies;
  };

  return {
    get: (...args) => resposeWriter(getAsync, ...args),
    create: (...args) => resposeWriter(createAsync, ...args),
    delete: (...args) => resposeWriter(removeAsync, ...args),
    list: (...args) => resposeWriter(listAsync, ...args)
  };
}
