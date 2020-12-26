import { AuthState, AuthActionTypes, LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED } from "./types";

const initialState: AuthState = {
  userid: null,
  error: null,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        userid: null,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        userid: null,
        ...action.payload,
      };
    default:
      return state;
  }
};
