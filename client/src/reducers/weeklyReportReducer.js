import isEmpty from '../validation/is-empty'
import {
  CREATE_WEEKLY_REPORT,
  GET_WEEKLY_REPORT,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  isExist: false,
  tasks: [],
  id: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_WEEKLY_REPORT:
      return {
        id: action.payload._id,
        tasks: action.payload.tasks,
        isExist: !isEmpty(action.payload.tasks)
      };
    case GET_WEEKLY_REPORT:
      return {
        id: action.payload._id,
        tasks: action.payload.tasks,
        isExist: !isEmpty(action.payload.tasks)
      };
    default:
      return state;
  }
}
