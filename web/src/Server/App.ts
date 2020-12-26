import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "./Utils/Database";
import { AppConfig, Config } from "./Config";
import { ApiAuth, ApiError, ReactMiddleware, RouterCache } from "./Middlewares";
import Api from "./Api";

class App {
  express: Express;
  config: Config;

  constructor(config: Config) {
    this.express = express();
    this.config = config;
    this.initMiddlewares();
    this.initRoutes();
  }

  initMiddlewares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use("/public", express.static("public"));
    if(this.config.environment.env === "development") {
      this.express.use(RouterCache.mount());
    } else {
      this.express.use("/client.js", express.static("client.js"));
      this.express.use("/style.css", express.static("style.css"));
    }
  }

  initRoutes() {
    this.express.use("/api", Api.router);
    this.express.use(ApiError);
    this.express.get("*", ApiAuth(false), (req, res) => {
      res.send(ReactMiddleware.getHtml(req));
    });
  }
}

export default new App(
  AppConfig,
);
