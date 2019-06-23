import {
  CREATE_WEEKLY_REPORT,
  CREATE_CUSTOM_REPORT,
  GET_WEEKLY_REPORT,
  GET_ALL_CUSTOM_REPORT,
  GET_CUSTOM_REPORT,
  GET_ERRORS,
  WEEKLY_REPORT_LOADING,
  CUSTOM_REPORT_LOADING,
  VERIFING_CUSTOM_REPORTS_LOADING,
  GET_VERIFING_CUSTOM_REPORTS,
  VERIFING_STATUS
} from "./types";
import axios from "axios";

import isEmpty from "../validation/is-empty"

//Create report

export const createCustomReport = reportData => dispatch => {
  axios.post("/api/reports/custom-report", reportData).then(res => {
    dispatch({
      type: CREATE_CUSTOM_REPORT,
      payload: res.data
    });
  });
};

// Get last custom report
export const getLastCustomReport = () => dispatch => {
  dispatch(setCustomReportLoading());  
  axios
    .post("/api/reports/custom-report/last")
    .then(res => {      
      dispatch({
        type: GET_CUSTOM_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get all custom reports
export const getAllCustomReports = () => dispatch => {    
  axios
    .get("/api/reports/custom-report/all")
    .then(res => {      
      dispatch({
        type: GET_ALL_CUSTOM_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get custom report that needs to be verified
export const getCustomReportsToBeVerified = () => dispatch => {
  dispatch(setReportsLoading());    
  axios
    .post("/api/reports/custom-report/not-verified")
    .then(res => {      
      dispatch({
        type: GET_VERIFING_CUSTOM_REPORTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Update custom report
export const updateCustomReport = (reportData) => dispatch => {
  dispatch(setReportsLoading());    
  axios
    .post(`/api/reports/custom-report/edit/${reportData._id}`, reportData)
    .then(res => {
      
      // Check if request was report verification
      if(!isEmpty(res.data.isFailed) && !res.data.isFailed) {
        dispatch(VERIFING_STATUS);
      }
      
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add weekly report
export const createWeeklyReport = reportData => dispatch => {
  axios
    .post("/api/reports/weekly-report", reportData)
    .then(res => {
      dispatch({
        type: CREATE_WEEKLY_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit weekly report
export const editWeeklyReport = reportData => dispatch => {
  axios
    .post(`/api/reports/weekly-report/edit/${reportData.id}`, reportData)
    .then(res => {
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get last weekly report
export const getLastWeeklyReport = reportData => dispatch => {
  dispatch(setWeeklyReportLoading()); 
  axios
    .post("/api/reports/weekly-report/last", reportData)
      .then(res => {      
      dispatch({
        type: GET_WEEKLY_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setWeeklyReportLoading = () => ({
  type: WEEKLY_REPORT_LOADING
});
export const setCustomReportLoading = () => ({
  type: CUSTOM_REPORT_LOADING
});

export const setReportsLoading = () => ({
  type: VERIFING_CUSTOM_REPORTS_LOADING
});
