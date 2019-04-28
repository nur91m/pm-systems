const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const CustomReportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  discipline: {
    type: String
  },
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
  },
  projects: [
    {
      participationPersentage: {
        type: Number,
        min: 0,
        max: 100
      },
      project: {
        type: String
      },
      tasks: [
        {
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
      ]
    }
  ]
});

module.exports = CustomReport = mongoose.model(
  "custom-report",
  CustomReportSchema
);
