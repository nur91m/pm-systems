import {CREATE_WEEKLY_REPORT, GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode'

//Register User 

export const registerUser = (userData) => dispatch =>  {
    axios.post('/api/users/register',userData)
    .then(res=> {
        console.log('User successfully registered');
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        // Save to localstorage
        const {token} = res.data;        
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

