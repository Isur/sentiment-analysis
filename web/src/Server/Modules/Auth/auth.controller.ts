import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import BaseController from "../BaseController";
import { Config } from "../../Config";
import { ApiValidator, ApiAuthentication } from "../../Middlewares";
import { loginValidation, registerValidation } from "./validations";
import AuthService from "./auth.service";
import { LoginRequestDto, LoginResponseDto, LogoutResponseDto, RegisterRequestDto, RegisterResponseDto } from "@shared/ApiDto/auth.dto";
import { API } from "@shared/Constants";

@Service()
class AuthController extends BaseController {
  public basePath = `/${API.AUTH}`
  @Inject()
  private readonly _config: Config

  @Inject()
  private readonly _authService: AuthService;

  public constructor() {
    super();
    this._initRoutes();
  }

  protected _initRoutes = (): void => {
    this.router.post("/login", ApiValidator(loginValidation), this.login);
    this.router.post("/register", ApiValidator(registerValidation), this.register);
    this.router.post("/logout", ApiAuthentication, this.logout);
  }

  public login = async (req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponseDto>) => {
    const loginData = await this._authService.login(req.body.login, req.body.password);
    res.header({ "auth-token": loginData.token });
    res.cookie("jwt", loginData.token, this._config.cookies);
    res.json({ userId: loginData.userId, access_token: loginData.token });
  }

  public register = async (req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponseDto>) => {
    const { email, password, confirmPassword, username } = req.body;
    const userId = await this._authService.register({ email, password, confirmPassword, username });
    res.json(userId);
  }

  public logout = async (req: Request<{}, {}, {}>, res: Response<LogoutResponseDto>) => {
    await this._authService.logout(req.session.id);
    res.status(200).json("Logged out");
  }
}

export default AuthController;
