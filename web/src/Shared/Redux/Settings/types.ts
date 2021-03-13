export interface StateSettings {
  app: string,
  theme: SettingThemes,
  serverVersion: string,
}
export type SettingThemes = "dark" | "light";
export const CHANGE_THEME = `[SETTINGS] CHANGE_THEME`;
export const FETCH_SETTINGS = `[SETTINGS] FETCH SETTINGS`;

interface ActionChangeTheme {
  type: typeof CHANGE_THEME,
  payload: SettingThemes,
}

interface ActionFetchSettings {
  type: typeof FETCH_SETTINGS,
  payload: {
    app: string,
    serverVersion: string,
  },
}

export type SettingsActionTypes = ActionChangeTheme | ActionFetchSettings;
