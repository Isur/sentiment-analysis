import { PrismaClient } from "@prisma/client";
import { SessionObject } from "../../../Common/Interfaces/session.interface";
import { AppConfig, Config } from "../../Config";
import { Database } from "../../Utils";
import { SessionService } from "./session.service.interface";

class Session implements SessionService {
  constructor(
    private readonly _db: PrismaClient,
    private readonly _config: Config,
  ) {}

  createSession = async (userId: string): Promise<string> => {
    const session = await this._db.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        expiryTime: new Date(Date.now() + this._config.cookies.maxAge),
      },
    });

    return session.id;
  }

  endSession = async (sessionId: string): Promise<void> => {
    await this._db.session.delete({ where: { id: sessionId } });
  }

  getSession = async (sessionId: string): Promise<SessionObject> => {
    const session = await this._db.session.findFirst({ where: { id: sessionId } });
    return {
      sessionId: session.id,
      userId: session.userId,
      expiryTime: session.expiryTime,
    };
  }
}

export default new Session(
  Database.client, AppConfig,
);
