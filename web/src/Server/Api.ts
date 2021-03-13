import { Router } from "express";
import PromiseRouter from "express-promise-router";
import { Service } from "typedi";
import { ApiBadEndpoint, ApiLogger } from "./Middlewares";
import { Controllers } from "./Modules";

@Service()
class Api {
  public router: Router;

  public constructor() {
    this.router = PromiseRouter();
    this._initRoutes();
  }

  private _initRoutes = () => {
    this.router.use(ApiLogger);
    Controllers.forEach(controller => {
      this.router.use(controller.basePath, controller.router);
    });
    this.router.use(ApiBadEndpoint);
  }
}

export default Api;
