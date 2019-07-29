import express from "express";
import rootController from "./controller/rootController";
import errorController from "./controller/errorController";
import companyController from './controller/companyController';

const app = express();
const controllers = {
  rootController: rootController(),
  errorController: errorController(),
  companyController: companyController(),
};

const DEFAULT_PORT = 7000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(requestLogger);

app.get("/", controllers.rootController.index);
app.get("/company/:id", controllers.companyController.get);
app.post("/company/", controllers.companyController.create);
app.delete("/company/:id", controllers.companyController.delete);
app.get("/company", controllers.companyController.list);


app.use(controllers.errorController.error404);
app.use(controllers.errorController.error500);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
