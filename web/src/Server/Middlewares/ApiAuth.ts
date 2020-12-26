import { NextFunction, Request, Response } from "express";
import { SessionService, Session } from "../Modules/Sessions";
import { HTTPError } from "../Utils";
import JWT, { JwtHelper } from "../Utils/JWT";
import { MiddlewareFunction } from "./Middleware.interface";

class Authenticate implements MiddlewareFunction {
  constructor(
    private readonly _jwt: JwtHelper,
    private readonly _sessionService: SessionService,
  ) {  }

  execute = (required: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    const token = this.getToken(req);

    try {
      const decoded = this._jwt.tokenVerify(token);
      if(!decoded) throw new HTTPError(403, "Unauthorized");
      const session = await this._sessionService.getSession(decoded.sessionid);
      req.session = {
        userid: session.userId,
        id: session.sessionId,
      };
    } catch(error) {
      if(required) throw new HTTPError(403, "Unauthorized");
      else {
        req.session = {
          userid: null,
          id: null,
        };
      }
    } finally {
      next();
    }
  }

  private getToken = (req: Request): string => {
    if(req.cookies.jwt) {
      return req.cookies.jwt;
    } else {
      return req.get("auth-token");
    }
  }
}

export default new Authenticate(
  JWT, Session,
).execute;
