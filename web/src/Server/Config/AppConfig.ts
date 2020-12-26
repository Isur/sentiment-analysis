import dotenv from "dotenv";
import { Config, Cookies, Environment, EnvironmentType } from "./config.interface";

class AppConfig implements Config {
  environment: Environment;
  cookies: Cookies;

  constructor() {
    dotenv.config();
    this.loadFromEnv();
    this.config();
  }

  loadFromEnv() {
    const port = process.env.PORT;
    const env = process.env.NODE_ENV as EnvironmentType;
    const secret = process.env.SECRET;
    this.environment = {
      env, port, secret,
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
