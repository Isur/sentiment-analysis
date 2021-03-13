import { NextFunction, Request, Response } from "express";
import { Logger } from "../Utils";
import { Middleware } from "./Middleware.interface";

class ApiLogger implements Middleware {
  public execute = (req: Request, res: Response, next: NextFunction) => {
    Logger.Log(`${req.method} - ${req.path}`);
    Logger.Log({ body: req.body }, true);
    next();
  }
}

export default new ApiLogger().execute;
