import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import BaseController from "../BaseController";
import SettingsService from "./settings.service";
import { SettingsObject } from "@shared/Interfaces/settings.inteface";
import { API } from "@shared/Constants";

@Service()
class SettingsController extends BaseController {
  public basePath = `/${API.SETTINGS}`;
  @Inject()
  private readonly _settingsService: SettingsService;

  public constructor() {
    super();
    this._initRoutes();
  }

  protected _initRoutes = () => {
    this.router.get("/", this.getSettings);
  }

  public getSettings = async (req: Request, res: Response<SettingsObject>) => {
    const settings = await this._settingsService.getSettings();
    res.json(settings);
  }
}

export default SettingsController;
