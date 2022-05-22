const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema(
  {
    researchInterest: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    supervisor: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coSupervisor: {
      type: String,
      default: "unavailable",
    },

    supervisorStatus: {
      type: String,
    },

    coSupervisorStatus: {
      type: String,
      default: "unavailable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
