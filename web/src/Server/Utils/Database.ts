import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { Config } from "../Config";

@Service()
class Prisma {
  public client: PrismaClient;
  public constructor(private readonly _config: Config) {
    this.client = new PrismaClient({ datasources: { db: { url: _config.environment.dbUrl } } });
  }
}

export default Prisma;
