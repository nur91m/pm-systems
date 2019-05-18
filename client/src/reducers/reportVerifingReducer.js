import isEmpty from "../validation/is-empty";
import {
  GET_VERIFING_CUSTOM_REPORTS,
  VERIFING_CUSTOM_REPORTS_LOADING
} from "../actions/types";

const initialState = {
  customReports: [],  
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFING_CUSTOM_REPORTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VERIFING_CUSTOM_REPORTS:

      let customReports = {};      

      action.payload.forEach(res => {
        const report = res.report;
        const userName = res.userName;

        if(userName in customReports) {
          customReports[userName].push(report)
        } else {
          customReports[userName] = [report];
        }        
      })
      return {
        customReports,        
        loading: false
      };
    default:
      return state;
  }
}
