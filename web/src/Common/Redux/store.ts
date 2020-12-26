import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CallHistoryMethodAction, connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { History } from "history";
import { StateSettings, SettingsActionTypes } from "./Settings/types";
import { settingsReducer } from "./Settings/reducers";
import { authReducer } from "./Auth/reducers";
import { AuthState } from "./Auth/types";

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  settings: settingsReducer,
  auth: authReducer,
});

export interface AppState {
  router: RouterState,
  settings: StateSettings,
  auth: AuthState,
}

export type ActionTypes = SettingsActionTypes;
export type AppThunkDispatch = ThunkDispatch<AppState, undefined, ActionTypes | CallHistoryMethodAction>

export const Store = (history: History, initData: Object = null) => {
  const historyMiddleware = routerMiddleware(history);
  const middlewares = [thunk, historyMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(
    rootReducer(history),
    initData,
    composeWithDevTools(middlewareEnhancer),
  );
};
