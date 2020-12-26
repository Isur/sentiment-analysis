import { AppConfig } from "../Config";

interface LoggerOptions {
  error?: boolean,
  depth?: boolean,
}

export interface Logger {
  log: (message: unknown, options?: LoggerOptions) => void,
}

class LogMachine implements Logger {
  debug: boolean;

  constructor(debug: boolean) {
    this.debug = debug;
  }

  log(message: unknown, options?: LoggerOptions) {
    if(!options) {
      // eslint-disable-next-line no-console
      console.log(message);
      return;
    }
    if(options.depth) {
      // eslint-disable-next-line no-console
      console.dir(message, { depth: null });
    } else if(options.error) {
      console.error(message);
    } else {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }
}

export default new LogMachine(AppConfig.environment.env === "development");
