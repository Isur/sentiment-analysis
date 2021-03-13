import { NextFunction, Response, Request } from "express";
import HTTPErrors from "../HttpErrors";
import { Middleware } from "./Middleware.interface";

class ApiAuthentication implements Middleware {
  public execute = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.id) {
      next();
    } else {
      throw new HTTPErrors.Unauthorized();
    }
  }
}

export default new ApiAuthentication().execute;
