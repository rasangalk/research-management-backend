const mongoose = require("mongoose");
const markingSchema = new mongoose.Schema(
  {
    assignmentName: {
      type: String,
      required: true,
    },

    namingField1: {
      type: String,
      required: true,
    },

    namingField2: {
      type: String,
      required: true,
    },

    namingField3: {
      type: String,
      required: true,
    },

    markingField1: {
      type: Number,
      required: true,
    },

    markingField2: {
      type: Number,
      required: true,
    },

    markingField3: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarkingSchema", markingSchema);
