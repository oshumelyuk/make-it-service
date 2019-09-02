import RepositoryBase from "./RepositoryBase";

class CompaniesRepository extends RepositoryBase {
  constructor() {
    super("companies");
    this.collectionName = "companies";
  }
}

export default CompaniesRepository;
