import isEmpty from '../validation/is-empty'
import {    
  GET_CUSTOM_REPORT, CUSTOM_REPORT_LOADING
} from "../actions/types";

const initialState = {
  isExist: false,
  projects: [],
  id: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {    
    case CUSTOM_REPORT_LOADING:
      return {
        ...state,
        loading: true
      }    
    case GET_CUSTOM_REPORT:
      if (action.payload.isExist) {
        return {
          id: "",
          projects: "",
          isExist: false,
          loading: false
        }
      } else {
      return {
        id: action.payload._id,
        projects: action.payload.projects,
        isExist: !isEmpty(action.payload.projects),
        loading: false
      };
    }
    default:
      return state;
  }
}
