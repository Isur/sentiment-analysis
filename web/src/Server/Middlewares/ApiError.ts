import { NextFunction, Request, Response } from "express";
import LogMachine, { Logger } from "../Utils/Logger";
import { HTTPError } from "../Utils/HTTPError";
import { MiddlewareError } from "./Middleware.interface";

class ApiError implements MiddlewareError {
  private readonly _logger: Logger;
  constructor(logger: Logger) {
    this._logger = logger;
  }

  execute = (error: HTTPError, req: Request, res: Response, next: NextFunction) => {
    this._logger.log(error, { error: true });
    res.status(error.code || 500).json({ code: error.code || 500, message: error.message });
  }
}

export default new ApiError(
  LogMachine,
).execute;
