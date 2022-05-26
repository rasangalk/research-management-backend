const mongoose = require("mongoose");

const panelSchema = new mongoose.Schema(
  {
    panelId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      min: 3,
      max: 5,
    },

    panelMembers: {
      member1: {
        memberId: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        username: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },
      },

      member2: {
        memberId: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        username: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },
      },

      member3: {
        memberId: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        username: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Panel", panelSchema);
