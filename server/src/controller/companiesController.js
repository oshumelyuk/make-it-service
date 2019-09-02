import CompaniesRepository from "../dal/companiesRepository";
import resposeWriter from "../utils/resposeWriter";
import companyValidator from "../validators/companyValidator";
import FsFileStorage from "../services/fsFileStorage";
import mime from 'mime-types';

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
    return await companiesRepository.createAsync(company);
  };

  const removeAsync = async (req, resp, next) => {
    const id = req.params.id;
    await companiesRepository.removeAsync(id);
  };

  const listAsync = async (req, resp, next) => {
    const companies = await companiesRepository.getAllAsync();
    return companies;
  };

  const updateLogoAsync = async (req, resp, next) => {
    const id = req.params.id;
    const ext = req.query.ext;
    if (!id) throw new Error('company id is not specified');
    if (!ext) throw new Error('file extension is not specified in args');

    var company = await companiesRepository.getByIdAsync(id);
    if (!company) return null;

    const fileStorage = new FsFileStorage();
    let fileName = `logo.${ext}`;
    let result = await fileStorage.saveFileAsync(id, fileName, req);
    await companiesRepository.updateAsync(company._id, {"logo": fileName});
    resp.status(200).json({ uploaded: true });
  };

  const getLogoAsync = async (req, resp, next) => {
    const id = req.params.id;
    var company = await companiesRepository.getByIdAsync(id);
    if (!company || !company.logo) return null;

    const fileStorage = new FsFileStorage();
    let contentType = mime.contentType(company.logo);
    resp.setHeader("Content-Type", contentType);
    let filePath = await fileStorage.getFileAsync(id, company.logo, resp);
  };

  return {
    get: (...args) => resposeWriter(getAsync, ...args),
    create: (...args) => resposeWriter(createAsync, ...args),
    delete: (...args) => resposeWriter(removeAsync, ...args),
    list: (...args) => resposeWriter(listAsync, ...args),
    updateLogo: (...args) => resposeWriter(updateLogoAsync, ...args),
    getLogo: (...args) => resposeWriter(getLogoAsync, ...args)
  };
}
