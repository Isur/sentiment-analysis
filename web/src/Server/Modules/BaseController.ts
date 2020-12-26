import { Router } from "express";
import PromiseRouter from "express-promise-router";

export interface Routable {
  router: Router,
  _initRoutes: () => void,
}

class BaseController {
  public router: Router;

  constructor() {
    this.router = PromiseRouter();
  }
}

export default BaseController;
