import axios from 'axios';

const setAuthToken = (token) => {
    if(token){
        axios.defaul.headers.common['Authorization'] = token;
    } else {
        delete axios.defaul.headers.common['Authorization'];
    }

} 
export default  setAuthToken;