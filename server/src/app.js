import express from "express";
import rootController from "./controller/rootController";
import companiesController from "./controller/companiesController";
import servicesController from "./controller/servicesController";
import reviewsController from "./controller/reviewsController";
import { onActionStarting, onActionCompleting } from "./middleware/actionFilters";
import requestCounter from "./middleware/requestCounter";
import { handleError404, handleError500 } from "./middleware/errorHandler";
import bodyParser from "body-parser";

const app = express();
const controllers = {
  rootController: rootController(),
  companiesController: companiesController(),
  servicesController: servicesController(),
  reviewsController: reviewsController(),
};

const DEFAULT_PORT = 7000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(onActionStarting);
app.use(requestCounter);

app.use(bodyParser.json());

app.get("/", controllers.rootController.index);
app.get("/companies", controllers.companiesController.list);
app.post("/companies", controllers.companiesController.create);
app.get("/companies/:id", controllers.companiesController.get);
app.get("/companies/:id/logo", controllers.companiesController.getLogo);
app.post("/companies/:id/logo", controllers.companiesController.updateLogo);
app.get("/companies/:id/services", controllers.servicesController.getForCompany);
app.delete("/companies/:id", controllers.companiesController.delete);
app.get("/services", controllers.servicesController.list);
app.post("/services", controllers.servicesController.create);
app.get("/companies/:id/reviews", controllers.reviewsController.listForCompany);
app.post("/companies/:id/reviews", controllers.reviewsController.create);
app.post("/companies/:id/reviews/bulk", controllers.reviewsController.bulkInsert);

app.use(onActionCompleting);
app.use(handleError404, handleError500);

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`));
