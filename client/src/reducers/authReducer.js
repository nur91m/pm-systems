import { CREATE_WEEKLY_REPORT, SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_WEEKLY_REPORT:
      return {
        ...state,
        user: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
