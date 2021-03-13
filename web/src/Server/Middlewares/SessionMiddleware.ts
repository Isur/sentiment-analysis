import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { SessionService } from "../Modules/Sessions";
import HTTPErrors from "../HttpErrors";
import JWT from "../Utils/JWT";
import { Middleware } from "./Middleware.interface";

class SessionMiddleware implements Middleware {
  private readonly _jwt: JWT;
  private readonly _sessionService: SessionService;
  public constructor() {
    this._jwt = Container.get(JWT);
    this._sessionService = Container.get(SessionService);
  }

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    const token = this._getToken(req);

    try {
      const decoded = this._jwt.tokenVerify(token);
      const session = await this._sessionService.getSession(decoded.sessionid);
      req.session = {
        userid: session.userId,
        id: session.sessionId,
      };
    } catch(error) {
      req.session = {
        userid: null,
        id: null,
      };
    } finally {
      next();
    }
  }

  private _getToken = (req: Request): string => {
    if(req.cookies.jwt) {
      return req.cookies.jwt;
    } else {
      return req.get("auth-token");
    }
  }
}

export default new SessionMiddleware().execute;
