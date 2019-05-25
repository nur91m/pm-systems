import {
  GET_PROJECTS,
  CREATE_PROJECTS,
  PROJECT_CREATING
} from "../actions/types";

const initialState = {
  creating: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.payload;
    case CREATE_PROJECTS:
      return { ...state, creating: false };
    case PROJECT_CREATING:
      return { ...state, creating: true };
    default:
      return state;
  }
}
