import { Service } from "typedi";
import { Apps, Cookies, Environment, EnvironmentType } from "./config.interface";
import { TIME } from "@shared/Constants";

@Service()
class Config {
  public environment: Environment;
  public cookies: Cookies;
  public apps: Apps;

  public constructor() {
    this._loadFromEnv();
    this._config();
  }

  private _loadFromEnv() {
    this.environment = {
      env: process.env.NODE_ENV as EnvironmentType || "development",
      port: process.env.PORT || "3000",
      secret: process.env.SECRET || "Some default secret that should be changed.",
      dbUrl: process.env.DATABASE_URL || "postgresql://boilerplate:boilerplate@localhost:5432/boilerplate?schema=public",
    };
    this.apps = {
      sentimentModule: process.env.FLASK_SENTIMENT,
    };
  }

  private _config = () => {
    this.cookies = {
      expiration: "10h",
      httpOnly: true,
      maxAge: TIME.HOUR * 10,
    };
  }
}

export default Config;
