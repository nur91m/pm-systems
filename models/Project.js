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
  reports: [
    {
      discipline: {
        type: String        
      },
      weeklyReport: {
        type: Schema.Types.ObjectId,
        ref: 'weekly-report'
      }
    }
  ],
  status: {
    type: String,
    required: true    
  }
});

module.exports = Project = mongoose.model('projects', ProjectSchema);
