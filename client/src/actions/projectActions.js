import {GET_PROJECTS} from './types';
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
          type: GET_PROJECTS,
          payload: null
        })
      );
}
