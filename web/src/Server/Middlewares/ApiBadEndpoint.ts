import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../Utils/HTTPError";
import { Middleware } from "./Middleware.interface";

class ApiBadEndpoint implements Middleware {
  execute = (req: Request, res: Response, next: NextFunction) => {
    next(new HTTPError(404, `No endpoint: ${req.method} ${req.path}`));
  }
}

export default new ApiBadEndpoint().execute;
