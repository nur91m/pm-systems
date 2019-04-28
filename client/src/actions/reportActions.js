import {
  CREATE_WEEKLY_REPORT,
  CREATE_CUSTOM_REPORT,
  GET_WEEKLY_REPORT,
  GET_CUSTOM_REPORT,
  GET_ERRORS,
  WEEKLY_REPORT_LOADING
} from "./types";
import axios from "axios";

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
  dispatch(setProjectLoading());
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

export const setProjectLoading = () => ({
  type: WEEKLY_REPORT_LOADING
});
