const mongoose = require("mongoose");
const studentSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    groupID: {
      type: String,
      required: true,
    },
    supervisorID: {
      type: String,
      required: true,
    },
    researchInterest: {
      type: String,
      required: true,
    },
    isViewed: {
      default: 0,
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    panelID: {
      type: String,
      required: true,
    },
    marks: {
      type: String,
    },
    commentPanel: {
      type: String,
    },

    marksPanel: {
      type: String,
    },
    isViewedPanel: {
      type: String,
    },
    submissionArray: [
      {
        submission: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentSubmission", studentSubmissionSchema);
