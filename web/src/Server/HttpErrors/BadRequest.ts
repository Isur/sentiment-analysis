import { ErrorMessage, HTTPError } from "./HTTPError";

export default class BadRequest extends HTTPError {
  public constructor(message: ErrorMessage = "Bad request") {
    super(400, message);
  }
}
