import { Inject, Service } from "typedi";
import HTTPErrors from "../../HttpErrors";
import { JWT, BCrypt } from "../../Utils";
import { UsersService } from "../Users";
import { SessionService } from "../Sessions";
import { Register } from "./interfaces/register.interface";
import { LoginResponse } from "./interfaces/login.interface";

@Service()
class Auth {
  @Inject()
  private readonly _jwt: JWT;

  @Inject()
  private readonly _userService: UsersService;

  @Inject()
  private readonly _sessionService: SessionService;

  @Inject()
  private readonly _bcrypt: BCrypt;

  public login = async (login: string, password: string): Promise<LoginResponse> => {
    const user = await this._userService.findUserWithPasswordByLogin(login);
    if(!user) throw new HTTPErrors.Unauthorized("Bad login and/or password");
    if(await this._bcrypt.compareHash(password, user.password) === false) throw new HTTPErrors.Unauthorized("Bad login and/or password");
    const sessionId = await this._sessionService.createSession(user.id);
    const token = this._jwt.generateAuthToken(user.id, sessionId);
    return { token, userId: user.id };
  }

  public register = async (userData: Register): Promise<string> => {
    if(userData.password !== userData.confirmPassword) throw new HTTPErrors.Unauthorized("Passwords mismatch");
    const emailTaken = await this._userService.findUser({ field: "email", value: userData.email });
    const usernameTaken = await this._userService.findUser({ field: "username", value: userData.username });
    if(emailTaken || usernameTaken) throw new HTTPErrors.Unauthorized("User already exists");

    const id = await this._userService.createUser({ ...userData });

    return id;
  }

  public logout = async (sessionId: string) => {
    await this._sessionService.endSession(sessionId);
  }
}

export default Auth;
