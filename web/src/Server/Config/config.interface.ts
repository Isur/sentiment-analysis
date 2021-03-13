export interface Environment {
  port: string,
  env: EnvironmentType,
  secret: string,
  dbUrl: string,
}

export interface Cookies {
  maxAge: number,
  httpOnly: boolean,
  expiration: string,
}

export type EnvironmentType = "development" | "production" | "dockerized";

export interface Apps {
  sentimentModule: string,
}
