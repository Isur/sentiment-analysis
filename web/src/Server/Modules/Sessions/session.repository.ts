import { Session } from "@prisma/client";
import { Inject, Service } from "typedi";
import { Database } from "../../Utils";

@Service()
export default class SessionRepository {
  @Inject()
  private readonly _db: Database;

  public createSession = async (userId: string, date: Date): Promise<Session> => {
    const session = await this._db.client.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        expiryTime: date,
      },
    });

    return session;
  }

  public deleteSession = async (sessionId: string): Promise<string> => {
    const session = await this._db.client.session.delete({ where: { id: sessionId } });
    return session.id;
  }

  public findSession = async (sessionId: string): Promise<Session> => {
    const session = await this._db.client.session.findFirst({ where: { id: sessionId } });
    return session;
  }

  public deleteOldSessions = async (time: number): Promise<number> => {
    const dateToRemove = new Date(Date.now() - time);
    const deleted = await this._db.client.session.deleteMany({ where: { expiryTime: { lt: dateToRemove } } });
    return deleted.count;
  }
}
