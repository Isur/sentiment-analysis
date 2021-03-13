import { StateTemplate, TemplateActionTypes, ACTION } from "./types";

const initialState: StateTemplate = {

};

export const templateReducer = (state = initialState, action: TemplateActionTypes): StateTemplate => {
  switch(action.type) {
    case ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};
