import { NextFunction, Request, Response } from "express";
import HTTPErrors from "../HttpErrors";
import { Middleware } from "./Middleware.interface";

class ApiBadEndpoint implements Middleware {
  public execute = (req: Request, res: Response, next: NextFunction) => {
    next(new HTTPErrors.NotFound(`No endpoint: ${req.method} ${req.path}`));
  }
}

export default new ApiBadEndpoint().execute;
