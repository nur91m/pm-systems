const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function(data){
    let errors = {};
    
    
    data.projectName = !isEmpty(data.projectName) ? data.projectName : '';
    data.orderNumber = !isEmpty(data.orderNumber) ? data.orderNumber : '';   
    
    
    if(Validator.isEmpty(data.projectName)) {        
        errors.projectName = 'Project name is required';
    }     
    if(Validator.isEmpty(data.orderNumber)) {
        errors.orderNumber = 'Project order number is required';
    }
    console.log(Array.isArray(data.disciplines));
    console.log(data.disciplines.length>0);
    
    if(!Array.isArray(data.disciplines) && !data.disciplines.length>0) {
        errors.disciplines = 'There should be at least one discipline selected';        
    }
   
    return {
        errors,
        isValid: isEmpty(errors)
    }

}