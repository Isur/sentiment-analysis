import { Dispatch } from "redux";
import settingsService from "../../../Client/Services/Settings/settings.service";
import { CHANGE_THEME, FETCH_SETTINGS, SettingsActionTypes, SettingThemes } from "./types";

export const changeTheme = (theme: SettingThemes) => async (dispatch: Dispatch<SettingsActionTypes>) => {
  dispatch({
    type: CHANGE_THEME,
    payload: theme,
  });
};

export const fetchSettings = () => async (dispatch: Dispatch<SettingsActionTypes>) => {
  const { appName, version } = await settingsService.getSettings();
  dispatch({
    type: FETCH_SETTINGS,
    payload: {
      app: appName,
      serverVersion: version,
    },
  });
};
