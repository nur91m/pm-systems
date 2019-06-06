import {GET_ERRORS, GET_USERS, SET_CURRENT_USER, CLEAR_USERS_FROM_STORE} from './types';

import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode'
import axios from 'axios';

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

//Get All Users
export const getUsers = () => dispatch =>  {
    axios.get('/api/users/allUsers')
    .then(res=> {
        console.log(res)
        dispatch({
            type: GET_USERS,
            payload: res.data

        })
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Edit user
export const editUser = (id) => dispatch =>  {
    axios.post('/api/users/edit', {id})
    .then(res=> {
        console.log('Successfully updated')
        
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Remove user
export const removeUser = (id) => dispatch =>  {
    axios.post('/api/users/remove', {id})
    .then(res=> {
        console.log(res)
        
    })
    .catch(err=>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//Clear users from store
export const clearUsersFromStore = () => dispatch =>  {
    dispatch({
        type: CLEAR_USERS_FROM_STORE
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
  

