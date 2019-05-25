import {GET_PROJECTS, CREATE_PROJECTS, PROJECT_CREATING, GET_ERRORS} from './types';
import axios from 'axios'


//Get all projects 
export const getProjects = () => dispatch =>  {
    axios.get('/api/projects/all')
    .then(res=>{
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        })
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
        payload: err.response.data
        })
      );
}

//Get project by order number
export const getProject = (orderNumber) => dispatch =>  {
  axios.get(`/api/projects/order-number/${orderNumber}`)
  .then(res=>{
      dispatch({
          type: GET_PROJECTS,
          payload: res.data
      })
  })
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//Create project
export const createProject = (projectData) => dispatch =>  {
  dispatch(setCreatingProject())
  axios.post(`/api/projects`, projectData)
  .then(res=>{
      dispatch({
          type: CREATE_PROJECTS,
          payload: res.data
      })
  })
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}


export const setCreatingProject = () => ({
  type: PROJECT_CREATING
});