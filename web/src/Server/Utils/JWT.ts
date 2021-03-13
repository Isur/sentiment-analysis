import jwt from "jsonwebtoken";
import { Inject, Service } from "typedi";
import { Config } from "../Config";

interface JwtToken {
  iat: number,
  userid: string,
  sessionid: string,
}
@Service()
class JWT {
  @Inject()
  private readonly _config: Config;

  public generateAuthToken = (userid: string, sessionId: string) => {
    return jwt.sign({ userid, sessionId }, this._config.environment.secret, { expiresIn: this._config.cookies.expiration });
  }

  public tokenVerify = (token: string) => {
    return jwt.verify(token, this._config.environment.secret, (error: unknown, decoded: JwtToken) => {
      if(error) return undefined;
      if(decoded === undefined || Date.now() - decoded.iat * 1000 > this._config.cookies.maxAge)  {
        return undefined;
      }
      return decoded;
    }) as unknown as JwtToken;
  }
}

export default JWT;
