import {
  GET_PROJECTS,
  CREATE_PROJECTS,
  PROJECT_CREATING
} from "../actions/types";

const initialState = {
  creating: false,
  projects: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {...state, projects: action.payload};
    case CREATE_PROJECTS:
      return { ...state, projects: [...state.projects, action.payload], creating: false };
    case PROJECT_CREATING:
      return { ...state, creating: true };
    default:
      return state;
  }
}
