import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import weeklyReportReducer from './weeklyReportReducer';
import customReportReducer from './customReportReducer';
import projectReducer from './projectReducer'



export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    weeklyReport: weeklyReportReducer,
    customReport: customReportReducer,
    project: projectReducer
})