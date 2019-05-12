const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const WeeklyReportSchema = new Schema({
  project: {
    type: String    
  }, // project OrderNumber 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  discipline: {
    type: String,
    required: true
  },
  tasks: [
    {
      isGroupRow: {
        type: Boolean,
        default: false
      },
      order: {
        type: Number
      },
      activityID: {
        type: String
      },
      description: {
        type: String
      },
      drawingNumber: {
        type: String
      },
      budgetHours: {
        type: Number
      },
      actualHours: {
        type: Number
      },
      earnedHours: {
        type: Number
      },
      remainingHours: {
        type: Number
      },
      progress: {
        type: Number
      },
      changedDate: {
        type: Date
      },
      comments: {
        type: String
      },
      docCount: {
        type: Number
      },
      totalHours: {
        type: Number
      },
      drawn1: {
        type: String
      },
      drawn2: {
        type: String
      },
      drawn3: {
        type: String
      },
      weight: {
        type: Number,
        default: 1
      }
    }
  ],
  date: {
    type: Date
  },
  needsVerification: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = WeeklyReport = mongoose.model(
  'weekly-report',
  WeeklyReportSchema
);
