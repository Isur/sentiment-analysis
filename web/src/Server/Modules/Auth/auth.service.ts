import { PrismaClient } from "@prisma/client";
import { HTTPError } from "../../Utils/HTTPError";
import { JWT, JwtHelper, Crypto, BCrypt } from "../../Utils";
import Database from "../../Utils/Database";
import { Users, UsersService } from "../Users";
import { Session, SessionService } from "../Sessions";
import { AuthService } from "./auth.service.interface";
import { Register } from "./interfaces/register.interface";
import { LoginResponse } from "./interfaces/login.interface";

class Auth implements AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly _jwt: JwtHelper,
    private readonly _db: PrismaClient,
    private readonly _userService: UsersService,
    private readonly _sessionService: SessionService,
    private readonly _bcrypt: Crypto,
  ) { }

  login = async (username: string, password: string): Promise<LoginResponse> => {
    const user = await this._db.user.findFirst({ where: { OR: [{ username }, { email: username }] } });
    if(!user) throw new HTTPError(401, "Bad login and/or password");
    if(await this._bcrypt.compareHash(password, user.password) === false) throw new HTTPError(401, "Bad login and/or password");
    const sessionId = await this._sessionService.createSession(user.id);
    const token = this._jwt.generateAuthToken(user.id, sessionId);
    return { token, userId: user.id };
  }

  register = async (userData: Register): Promise<string> => {
    if(userData.password !== userData.confirmPassword) throw new HTTPError(401, "Passwords mismatch");
    const emailTaken = await this._userService.findUser({ field: "email", value: userData.email });
    const usernameTaken = await this._userService.findUser({ field: "username", value: userData.username });
    if(emailTaken || usernameTaken) throw new HTTPError(401, "User already exists");

    const id = await this._userService.createUser({ ...userData });

    return id;
  }

  logout = async (sessionId: string) => {
    await this._sessionService.endSession(sessionId);
  }
}

export default new Auth(
  JWT, Database.client, Users, Session, BCrypt,
);
