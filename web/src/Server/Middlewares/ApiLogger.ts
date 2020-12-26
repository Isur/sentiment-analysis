import { NextFunction, Request, Response } from "express";
import LogMachine, { Logger } from "../Utils/Logger";
import { Middleware } from "./Middleware.interface";

class ApiLogger implements Middleware {
  private readonly _logger: Logger;
  constructor(logger: Logger) {
    this._logger = logger;
  }

  execute = (req: Request, res: Response, next: NextFunction) => {
    this._logger.log(`${req.method} - ${req.path}`);
    this._logger.log({ body: req.body }, { depth: true });
    next();
  }
}

export default new ApiLogger(
  LogMachine,
).execute;
