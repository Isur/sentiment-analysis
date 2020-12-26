import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { HTTPError } from "../Utils/HTTPError";
import { MiddlewareFunction } from "./Middleware.interface";

class ApiValidator implements MiddlewareFunction {
  execute = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    let errorMessage = "";
    const errorsObject = errors.mapped();
    for(const error in errorsObject) {
      errorMessage += `${errorsObject[error].msg} for param {${errorsObject[error].param}} located in {${errorsObject[error].location}}. `;
    }
    if(errors.isEmpty()) {
      return next();
    }

    throw new HTTPError(400, errorMessage);
  }
}

export default new ApiValidator().execute;
