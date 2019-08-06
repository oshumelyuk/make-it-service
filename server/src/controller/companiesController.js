import companiesService from "../dal/companiesService";
import resposeWriter from "../utils/resposeWriter";
import companyValidator from "../validators/companyValidator";

export default function companiesController() {
  const getAsync = async (req, resp, next) => {
    const id = req.params.id;
    var companies = await companiesService().getByIdAsync(id);
  };

  const createAsync = async (req, resp, next) => {
    var company = req.body;
    let validateResult = companyValidator.validate(company);
    if (!validateResult.isValid) {
      return validateResult;
    }
    await companiesService().createAsync(company);
  };

  const removeAsync = async (req, resp, next) => {
    const id = req.params.id;
    await companiesService().removeAsync(id);
  };

  const listAsync = async (req, resp, next) => {
    const companies = await companiesService().getAllAsync();
    return companies;
  };

  return {
    get: (...args) => resposeWriter(getAsync, ...args),
    create: (...args) => resposeWriter(createAsync, ...args),
    delete: (...args) => resposeWriter(removeAsync, ...args),
    list: (...args) => resposeWriter(listAsync, ...args)
  };
}
