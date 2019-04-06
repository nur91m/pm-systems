const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function(data){
    let errors = {};
    
    
    data.name = !isEmpty(data.name) ? data.name : '';
    data.orderNumber = !isEmpty(data.orderNumber) ? data.orderNumber : '';   
    
    
    if(Validator.isEmpty(data.name)) {        
        errors.name = 'Project name is required';
    }     
    if(Validator.isEmpty(data.orderNumber)) {
        errors.orderNumber = 'Project order number is required';
    }
    if(Array.isArray(data.disciplines) && data.disciplines.length>0) {
        errors.disciplines = 'There should be at least one discipline selected';
        console.log(1);
    }
   
    return {
        errors,
        isValid: isEmpty(errors)
    }

}