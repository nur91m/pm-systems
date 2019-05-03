import isEmpty from '../validation/is-empty'
import {
  CREATE_WEEKLY_REPORT,
  GET_WEEKLY_REPORT,  
  WEEKLY_REPORT_LOADING
} from "../actions/types";

const initialState = {
  isExist: false,
  tasks: [],
  id: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WEEKLY_REPORT_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_WEEKLY_REPORT:
      return {
        id: action.payload._id,
        tasks: action.payload.tasks,
        isExist: !isEmpty(action.payload.tasks),
        loading: false
      };
    case GET_WEEKLY_REPORT:
      return {
        id: action.payload._id,
        tasks: action.payload.tasks,
        isExist: !isEmpty(action.payload.tasks),
        loading: false
      };
    default:
      return state;
  }
}
