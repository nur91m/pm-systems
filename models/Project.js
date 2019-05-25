const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  disciplines: [
    {
      type: [String],
      required: true
    }
  ],  
  status: {
    type: String    
  },
  reportDay: {
    type: Number,
    default: 1
  }

});

module.exports = Project = mongoose.model('projects', ProjectSchema);
