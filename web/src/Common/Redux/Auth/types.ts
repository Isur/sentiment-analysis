export interface AuthState {
  userid: string,
  error: string,
}

export const LOGIN_SUCCESS = `[AUTH] LOGIN SUCCESS`;
export const LOGIN_FAILED = `[AUTH] LOGIN FAILED`;
export const LOGOUT = `[AUTH] LOGOUT`;

interface ActionLoginSuccess {
  type: typeof LOGIN_SUCCESS,
  payload: {
    userid: string,
  },
}

interface ActionLoginFailed {
  type: typeof LOGIN_FAILED,
  payload: {
    error: string,
  },
}

interface ActionLogout {
  type: typeof LOGOUT,
}

export type AuthActionTypes = ActionLoginSuccess | ActionLogout | ActionLoginFailed;
