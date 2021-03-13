import { Router } from "express";
import PromiseRouter from "express-promise-router";

abstract class BaseController {
  public router: Router;
  public abstract basePath: string;
  protected abstract _initRoutes: () => void;
  public constructor() {
    this.router = PromiseRouter();
  }
}

export default BaseController;
