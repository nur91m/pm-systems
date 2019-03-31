const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const WeeklyReportSchema = new Schema({
    project: {
      type: Schema.Types.ObjectId,
      ref: 'projects'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    disciplines: [
      {
        name: {
          type: String,
          required: true
        }
      }
    ],
    tasks: [
      {
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
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        drawn2: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        drawn3: {
          type: Schema.Types.ObjectId,
          ref: 'users'
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
  
  module.exports = WeeklyReport = mongoose.model('weekly-report', WeeklyReportSchema);