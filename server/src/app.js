import express from "express";
import rootController from "./controller/rootController";
import companiesController from "./controller/companiesController";
import servicesController from "./controller/servicesController";
import { onActionStarting, onActionCompleting } from "./middleware/actionFilters";
import requestCounter from "./middleware/requestCounter";
import { handleError404, handleError500 } from "./middleware/errorHandler";
import bodyParser from "body-parser";

const app = express();
const controllers = {
  rootController: rootController(),
  companiesController: companiesController(),
  servicesController: servicesController()
};

const DEFAULT_PORT = 7000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(onActionStarting);
app.use(requestCounter);

app.use(bodyParser.json());

app.get("/", controllers.rootController.index);
app.get("/companies/:id", controllers.companiesController.get);
app.post("/companies", controllers.companiesController.create);
app.delete("/companies/:id", controllers.companiesController.delete);
app.get("/companies", controllers.companiesController.list);
app.get("/companies/:id/services", controllers.servicesController.getForCompany);
app.get("/services", controllers.servicesController.list);
app.post("/services", controllers.servicesController.create);

app.use(onActionCompleting);
app.use(handleError404, handleError500);

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`));
