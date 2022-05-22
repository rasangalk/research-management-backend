const mongoose = require("mongoose");
const templateSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    researchTemplates: [
      {
        template: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
