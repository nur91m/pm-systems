import isEmpty from '../validation/is-empty'
import {  
  GET_ERRORS,  
  GET_CUSTOM_REPORT
} from "../actions/types";

const initialState = {
  isExist: false,
  projects: [],
  id: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {        
    case GET_CUSTOM_REPORT:
      console.log(action.payload)
      return {
        id: action.payload._id,
        projects: action.payload.projects,
        isExist: !isEmpty(action.payload.projects),
        loading: false
      };
    default:
      return state;
  }
}
