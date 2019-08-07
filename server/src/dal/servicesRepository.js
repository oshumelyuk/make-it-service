import RepositoryBase from "./RepositoryBase";

class ServicesRepository extends RepositoryBase {
  constructor() {
    super("services");
    this.collectionName = "services";
  }
}

export default ServicesRepository;
