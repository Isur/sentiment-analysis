import jwt from "jsonwebtoken";
import { AppConfig, Config } from "../Config";

interface JwtToken {
  iat: number,
  userid: string,
  sessionid: string,
}

export interface JwtHelper {
  generateAuthToken: (userid: string, sessionId: string) => string,
  tokenVerify: (token: string) => JwtToken,
}

class JWT implements JwtHelper {
  private readonly _config: Config
  constructor(config: Config) {
    this._config = config;
  }

  generateAuthToken = (userid: string, sessionId: string) => {
    return jwt.sign({ userid, sessionId }, this._config.environment.secret, { expiresIn: this._config.cookies.expiration });
  }

  tokenVerify = (token: string) => {
    return jwt.verify(token, this._config.environment.secret, (error, decoded: JwtToken) => {
      if(error) return undefined;
      if(decoded === undefined || Date.now() - decoded.iat * 1000 > this._config.cookies.maxAge)  {
        return undefined;
      }
      return decoded;
    }) as unknown as JwtToken;
  }
}

export default new JWT(
  AppConfig,
);
