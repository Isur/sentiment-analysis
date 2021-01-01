export interface Config {
  environment: Environment,
  cookies: Cookies,
  containers: Containers,
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

export interface Containers {
  sentiment: string,
}
