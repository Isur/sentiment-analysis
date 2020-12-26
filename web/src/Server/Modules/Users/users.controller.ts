import { Request, Response } from "express";
import BaseController, { Routable } from "../BaseController";
import { ApiAuth } from "../../Middlewares";
import { MeResponseDto } from "../../../Common/ApiDto/users.dto";
import { UsersService } from "./users.service.interface";
import Users from "./users.service";

class UsersController extends BaseController implements Routable {
  constructor(
    private readonly _usersService: UsersService,
  ) {
    super();
    this._initRoutes();
  }

  _initRoutes = () => {
    this.router.get("/me", ApiAuth(true), this.getMe);
  }

  getMe = async (req: Request, res: Response<MeResponseDto>) => {
    const user = await this._usersService.findUser({ field: "id", value: req.session.userid });
    res.json(user);
  }
}

export default new UsersController(
  Users,
);
