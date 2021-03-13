import { body } from "express-validator";

export const sentimentValidation = [
  body("text").isString()
    .notEmpty(),
];
