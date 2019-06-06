import { SET_CURRENT_USER, GET_USERS, CLEAR_USERS_FROM_STORE } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  allUsers: [],
  canEdit: false
};

export default function(state = initialState, action) {
  switch (action.type) {    
    case SET_CURRENT_USER:      
      return {        
        isAuthenticated: !isEmpty(action.payload),
        user: {...action.payload, ...{canEdit: action.payload.role !== 'Employee' ? true : false}}        
      };
    case GET_USERS: 
      return {...state, allUsers: action.payload}
    case CLEAR_USERS_FROM_STORE: {
      return {...state, allUsers: []}
    }
    default:
      return state;
  }
}
