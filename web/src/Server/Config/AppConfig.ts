import dotenv from "dotenv";
import { Config, Containers, Cookies, Environment, EnvironmentType } from "./config.interface";

class AppConfig implements Config {
  environment: Environment;
  cookies: Cookies;
  containers: Containers;

  constructor() {
    dotenv.config();
    this.loadFromEnv();
    this.config();
  }

  loadFromEnv() {
    this.environment = {
      env: process.env.NODE_ENV as EnvironmentType,
      port: process.env.PORT,
      secret: process.env.SECRET,
    };
    this.containers = {
      sentiment: process.env.FLASK_SENTIMENT,
    };
  }

  config = () => {
    const HOUR = 1000 * 60 * 60;

    this.cookies = {
      expiration: "10h",
      httpOnly: true,
      maxAge: HOUR * 10,
    };
  }
}

export default new AppConfig();
