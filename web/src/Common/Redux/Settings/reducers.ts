import { CHANGE_THEME, StateSettings, SettingsActionTypes, FETCH_SETTINGS } from "./types";

const initialState: StateSettings = {
  app: "App Name",
  theme: "dark",
  serverVersion: ".",
};

export const settingsReducer = (state = initialState, action: SettingsActionTypes): StateSettings => {
  switch(action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case FETCH_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
