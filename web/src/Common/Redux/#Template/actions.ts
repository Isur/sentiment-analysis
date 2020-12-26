import { Dispatch } from "redux";
import { ACTION, StateTemplate, TemplateActionTypes } from "./types";

export const action = () => async (dispatch: Dispatch<TemplateActionTypes>) => {
  dispatch({
    type: ACTION,
    payload: null,
  });
};
