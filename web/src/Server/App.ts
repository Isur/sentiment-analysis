import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { Service } from "typedi";
import "./Utils/Database";
import { Logger, RouterCache } from "./Utils";
import { Config } from "./Config";
import { SessionMiddleware, ApiError, ReactMiddleware, ApiLang } from "./Middlewares";
import Api from "./Api";
import { FOLDERS } from "./Constants";
import { StartJobs } from "./AutomatedJobs";

@Service()
class App {
  public express: Express;
  public constructor(
    private readonly config: Config,
    private readonly api: Api,
    private readonly routerCache: RouterCache,
    private readonly react: ReactMiddleware,
    private readonly startJobs: StartJobs,
  ) {
    this.express = express();
    this._initMiddlewares();
    this._initRoutes();
    this._initJobs();
  }

  private async _initJobs() {
    await this.startJobs.startJobs();
  }

  private _initMiddlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(SessionMiddleware);
    this.express.use("/public", express.static(FOLDERS.PUBLIC));
    if(this.config.environment.env === "development") {
      this.express.use(this.routerCache.mount());
    } else {
      this.express.use("/client.js", express.static("client.js"));
      this.express.use("/style.css", express.static("style.css"));
    }
  }

  private _initRoutes() {
    this.express.use("/api", this.api.router);
    this.express.use(ApiError);
    this.express.use(ApiLang);
    this.express.get("*", (req, res) => {
      res.send(this.react.getHtml(req));
    });
  }
}

export default App;
