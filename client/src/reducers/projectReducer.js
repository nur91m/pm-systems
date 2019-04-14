import {GET_PROJECTS, GET_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.payload;
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
