import moment from 'moment'
// Get Current time
const url ="https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=Asia/Almaty"

export const getTime = () => {
    fetch(url)    
    .then(res => {
        res.json().then( (res2) => {
            const currentDate = moment(res2.fulldate)            
            return res2            
        })
    })
    .catch(err=>{
       console.log(err)
    })
}
