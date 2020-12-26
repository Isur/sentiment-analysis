import { Request, Response } from "express";
import { SettingsObject } from "../../../Common/Interfaces/settings.inteface";
import BaseController, { Routable } from "../BaseController";
import Settings from "./settings.service";
import { SettingsService } from "./settings.service.interface";

class SettingsController extends BaseController implements Routable {
  constructor(
    private readonly _settingsService: SettingsService,
  ) {
    super();
    this._initRoutes();
  }

  _initRoutes = () => {
    this.router.get("/", this.getSettings);
  }

  getSettings = async (req: Request, res: Response<SettingsObject>) => {
    const settings = await this._settingsService.getSettings();
    res.json(settings);
  }
}

export default new SettingsController(Settings);
