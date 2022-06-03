const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    deadlineDate: {
      type: String,
      required: true,
    },
    deadlineTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
