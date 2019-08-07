import ReviewsRepository from "../dal/reviewsRepository";
import CompaniesRepository from "../dal/companiesRepository";
import ServicesRepository from "../dal/servicesRepository";
import resposeWriter from "../utils/resposeWriter";
import reviewValidator from "../validators/reviewValidator";

export default function servicesController() {
  const reviewsRepository = new ReviewsRepository();
  const companiesRepository = new CompaniesRepository();
  const servicesRepository = new ServicesRepository();

  const listForCompanyAsync = async (req, resp, next) => {
    const id = req.params.id;

    let [company, reviews, services] = await Promise.all([
      companiesRepository.getByIdAsync(id),
      reviewsRepository.getByCompanyIdAsync(id),
      servicesRepository.getAllAsync(id)
    ]);
    if (!company) {
      return null;
    }
    return reviews.map(r => ({
      rate: r.rate,
      createdDate: r.createdDate,
      comment: r.comment,
      service: services.find(x => x._id.str == r.serviceId.str)
    }));
  };

  const createAsync = async (req, resp, next) => {
    var review = req.body;
    let validateResult = reviewValidator.validate(review);
    if (!validateResult.isValid) {
      return validateResult;
    }

    let [company, service] = await Promise.all(companiesRepository.getByIdAsync(review.companyId), servicesRepository.getByIdAsync(review.serviceId));

    if (!company) throw new Error(`Company ${review.companyId} does not exist`);
    if (!service) throw new Error(`Service ${review.serviceId} does not exist`);

    await reviewsRepository.createAsync(review);
  };

  const bulkInsertAsync = async (req, resp, next) => {
    throw new Error("Not implemented");
  };

  return {
    listForCompany: (...args) => resposeWriter(listForCompanyAsync, ...args),
    create: (...args) => resposeWriter(createAsync, ...args),
    bulkInsert: (...args) => resposeWriter(bulkInsertAsync, ...args)
  };
}
