import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail()
    .notEmpty(),
  body("password").isString()
    .isLength({ min: 8 }),
  body("confirmPassword").isString(),
  body("username").isString()
    .notEmpty(),
];

export const loginValidation = [
  body("login").isString()
    .notEmpty(),
  body("password").isString()
    .notEmpty(),
];
