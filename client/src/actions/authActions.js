import {CREATE_WEEKLY_REPORT} from './types';

//Register User 

export const registerUser = (userData) => {
    return {
        type: CREATE_WEEKLY_REPORT,
        payload: userData
    }
}