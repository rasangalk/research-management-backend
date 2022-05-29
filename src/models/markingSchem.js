const mongoose = require("mongoose");
const markingSchema = new mongoose.Schema(
  {
    assignmentName: {
      type: String,
      required: true,
    },
    markingScheme: [
      {
        markName: {
          type: String,
        },
        marks: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarkingSchema", markingSchema);
