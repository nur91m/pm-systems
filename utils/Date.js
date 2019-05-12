const moment = require('moment');
const axios = require('axios');

// Get Current time
const url ="https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=Asia/Almaty"
exports.currentTime = async () => {
    return await this.getTime();
}
exports.getTime = () => {
    axios.get(url)
        .then(res => {            
            return res.data.fulldate 
    })    
}

exports.getMonth = () => {
    axios.get(url)
        .then(res => {            
            return res.data.month 
    })    
}


