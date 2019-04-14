import {GET_PROJECTS, GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode'

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
          type: GET_PROJECTS,
          payload: null
        })
      );
}
