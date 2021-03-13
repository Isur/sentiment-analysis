import { Dispatch } from "redux";
import { CHANGE_THEME, FETCH_SETTINGS, SettingsActionTypes, SettingThemes } from "./types";
import settingsService from "@client/Services/Settings/settings.service";

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
