import { SettingsObject } from "../../../Common/Interfaces/settings.inteface";

export interface SettingsService {
  getSettings: () => Promise<SettingsObject>,
}
