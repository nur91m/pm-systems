import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  canEdit: false
};

export default function(state = initialState, action) {
  switch (action.type) {    
    case SET_CURRENT_USER:      
      return {        
        isAuthenticated: !isEmpty(action.payload),
        user: {...action.payload, ...{canEdit: action.payload.role !== 'Employee' ? true : false}}        
      };
    default:
      return state;
  }
}
