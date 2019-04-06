const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const CustomReportSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'projects'
  },
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
      participationPersentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      description: {
        type: String
      },
      sheetCount: {
        type: Number
      },
      sheetSize: {
        type: String
      },
      progress: {
        type: Number
      },
      comments: {
        type: String
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

module.exports = CustomReport = mongoose.model(
  'custom-report',
  CustomReportSchema
);
