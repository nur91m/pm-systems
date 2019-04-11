import {CREATE_WEEKLY_REPORT, GET_ERRORS} from './types';
import axios from 'axios';


//Create report 

export const createCustomReport = reportData => {
    
    return {
        type: CREATE_WEEKLY_REPORT,
        payload: reportData
    }
}

// Add weekly report 
export const createWeeklyReport = reportData => dispatch => {
    axios
    .post('/api/reports/weekly-report', reportData)
    .then(res => {
        dispatch({
            type: CREATE_WEEKLY_REPORT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
}
