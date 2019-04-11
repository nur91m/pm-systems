import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import weeklyReportReducer from './weeklyReportReducer';
import customReportReducer from './customReportReducer';



export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    weeklyReport: weeklyReportReducer,
    customReport: customReportReducer
})