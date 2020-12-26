export interface Config {
  environment: Environment,
  cookies: Cookies,
}

export interface Environment {
  port: string,
  env: EnvironmentType,
  secret: string,
}

export interface Cookies {
  maxAge: number,
  httpOnly: boolean,
  expiration: string,
}

export type EnvironmentType = "development" | "production" | "dockerized";
