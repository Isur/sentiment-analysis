import { Router } from "express";
import PromiseRouter from "express-promise-router";
import { ApiBadEndpoint, ApiLogger } from "./Middlewares";
import { AuthModule, SettingsModule, UsersModule } from "./Modules";

class Api {
  router: Router;

  constructor() {
    this.router = PromiseRouter();
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.use(ApiLogger);
    this.router.use("/auth", AuthModule.AuthController.router);
    this.router.use("/users", UsersModule.UsersController.router);
    this.router.use("/settings", SettingsModule.SettingsController.router);
    this.router.use(ApiBadEndpoint);
  }
}

export default new Api();
