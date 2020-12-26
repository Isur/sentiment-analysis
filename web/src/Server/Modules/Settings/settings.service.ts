import { SettingsObject } from "../../../Common/Interfaces/settings.inteface";
import { SettingsService } from "./settings.service.interface";

class Settings implements SettingsService {
  getSettings = async (): Promise<SettingsObject> => {
    return {
      appName: "Sentiment-Analysis",
      version: "1.0.0",
    };
  }
}

export default new Settings();
