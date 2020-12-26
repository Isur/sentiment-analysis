import { SessionObject } from "../../../Common/Interfaces/session.interface";

export interface SessionService {
  createSession: (userid: string) => Promise<string>,
  getSession: (sessionId: string) => Promise<SessionObject>,
  endSession: (sessionId: string) => Promise<void>,
}
