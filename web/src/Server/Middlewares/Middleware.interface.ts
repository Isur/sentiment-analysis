import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../HttpErrors/HTTPError";

export interface Middleware {
  execute: (req: Request, res: Response, next: NextFunction) => void,
}

export interface MiddlewareError {
  execute: (error: HTTPError, req: Request, res: Response, next: NextFunction) => void,
}

export interface MiddlewareFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any) => (req: Request, res: Response, next: NextFunction) => void,
}
