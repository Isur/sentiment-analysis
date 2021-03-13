import { NextFunction, Request, Response } from "express";
import { Logger } from "../Utils";
import { HTTPError } from "../HttpErrors/HTTPError";
import { MiddlewareError } from "./Middleware.interface";

class ApiError implements MiddlewareError {
  public execute = (error: HTTPError, req: Request, res: Response, next: NextFunction) => {
    Logger.Error(error);
    res.status(error.code || 500).json({ code: error.code || 500, message: error.message });
  }
}

export default new ApiError().execute;
