const mongoose = require("mongoose");
const studentSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
