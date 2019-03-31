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
      name: {
        type: String,
        required: true
      },
      reports: [
        {
          weeklyReport: {
            type: Schema.Types.ObjectId,
            ref: 'weekly-report'
          }
        }
      ]
    }
  ]
});

module.exports = Project = mongoose.model('projects', ProjectSchema);
