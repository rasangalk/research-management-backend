const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
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

    supervisorName: {
      type: String,
      default: "unavailable",
    },

    coSupervisorName: {
      type: String,
      default: "unavailable",
    },

    coSupervisor: {
      type: String,
      default: "unavailable",
    },

    supervisorStatus: {
      type: String,
      default: "unavailable",
    },

    coSupervisorStatus: {
      type: String,
      default: "unavailable",
    },
    supervisorComment: {
      type: String,
      default: "unavailable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
