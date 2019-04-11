import {CREATE_WEEKLY_REPORT, GET_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_WEEKLY_REPORT:
      return action.payload;
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
