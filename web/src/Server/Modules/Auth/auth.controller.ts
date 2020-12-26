import { Request, Response } from "express";
import { body } from "express-validator";
import BaseController, { Routable } from "../BaseController";
import { AppConfig, Config } from "../../Config";
import { ApiValidator, ApiAuth } from "../../Middlewares";
import { LoginRequestDto, LoginResponseDto, LogoutResponseDto, RegisterRequestDto, RegisterResponseDto } from "../../../Common/ApiDto/auth.dto";
import Auth from "./auth.service";
import { AuthService } from "./auth.service.interface";

class AuthController extends BaseController implements Routable {
  constructor(
    private readonly _authService: AuthService,
    private readonly _config: Config) {
    super();
    this._initRoutes();
  }

  _initRoutes = (): void => {
    this.router.post("/login", ApiValidator([
      body("login").isString()
        .notEmpty(),
      body("password").isString()
        .notEmpty(),
    ]), this.login);
    this.router.post("/register", ApiValidator([
      body("email").isEmail()
        .notEmpty(),
      body("password").isString()
        .isStrongPassword(),
      body("confirmPassword").isString()
        .isStrongPassword(),
      body("username").isString()
        .notEmpty(),
    ]), this.register);
    this.router.post("/logout", ApiAuth(true), this.logout);
  }

  login = async (req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponseDto>) => {
    const loginData = await this._authService.login(req.body.login, req.body.password);
    res.header({ "auth-token": loginData.token });
    res.cookie("jwt", loginData.token, this._config.cookies);
    res.json({ userId: loginData.userId, access_token: loginData.token });
  }

  register = async (req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponseDto>) => {
    const { email, password, confirmPassword, username } = req.body;
    const userId = await this._authService.register({ email, password, confirmPassword, username });
    res.json(userId);
  }

  logout = async (req: Request<{}, {}, {}>, res: Response<LogoutResponseDto>) => {
    await this._authService.logout(req.session.id);
    res.status(200).json("Logged out");
  }
}

export default new AuthController(
  Auth,
  AppConfig,
);
