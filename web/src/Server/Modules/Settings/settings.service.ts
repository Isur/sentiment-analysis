import { Service } from "typedi";
import { SettingsObject } from "@shared/Interfaces/settings.inteface";

@Service()
class SettingsService {
  public getSettings = async (): Promise<SettingsObject> => {
    return {
      appName: "Boilerplate",
      version: "1.0.0",
    };
  }
}

export default SettingsService;
