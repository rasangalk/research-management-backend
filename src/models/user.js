const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      min: 3,
      max: 20,
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "supervisor", "coSupervisor", "staff", "admin"],
      default: "staff",
    },

    hash_password: {
      type: String,
      required: true,
    },

    re_hash_password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: false,
      trim: true,
      min: 3,
      max: 30,
    },

    sliit_id: {
      type: String,
      required: false,
      trim: true,
      min: 3,
      max: 20,
    },

    phone: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
    },

    specialization: {
      type: String,
    },

    research_interest: {
      type: String,
      enum: ["AI", "ML", "CD", "EF", "GH"],
    },

    // subject: {
    //   type: String,
    //   enum: ["AQ", "BQ", "CQ", "EQ", "GQ"],
    // },

    panel: {
      type: String,
      default: "unavailable",
    },

    students: {
      leader: {
        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        sliit_id: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },

        phone: {
          type: String,
          required: false,
        },

        email: {
          type: String,
          trim: true,
          unique: true,
        },

        specialization: {
          type: String,
          // enum: ["SE", "CSNE", "DS", "ISE", "CS"],
        },
      },

      member1: {
        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        sliit_id: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },

        phone: {
          type: String,
          required: false,
        },

        email: {
          type: String,
          trim: true,
          unique: true,
        },

        specialization: {
          type: String,
          // enum: ["SE", "CSNE", "DS", "ISE", "CS"],
        },
      },

      member2: {
        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        sliit_id: {
          type: String,
          trim: true,
          min: 3,
          max: 20,
        },

        phone: {
          type: String,
          required: false,
        },

        email: {
          type: String,
          trim: true,
          unique: true,
        },

        specialization: {
          type: String,
          // enum: ["SE", "CSNE", "DS", "ISE", "CS"],
        },
      },

      member3: {
        fullName: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 30,
        },

        sliit_id: {
          type: String,
          required: false,
          trim: true,
          min: 3,
          max: 20,
        },

        phone: {
          type: String,
          required: false,
        },

        email: {
          type: String,
          trim: true,
          unique: true,
        },

        specialization: {
          type: String,
          // enum: ["SE", "CSNE", "DS", "ISE", "CS"],
        },
      },
    },
    status: {
      no1: {
        type: String,
        default: "false",
      },
      no2: {
        type: String,
        default: "false",
      },
      no3: {
        type: String,
        default: "false",
      },
      no4: {
        type: String,
        default: "false",
      },
      no5: {
        type: String,
        default: "false",
      },
      no6: {
        type: String,
        default: "false",
      },
      no7: {
        type: String,
        default: "false",
      },
      no8: {
        type: String,
        default: "false",
      },
      no9: {
        type: String,
        default: "false",
      },
      no10: {
        type: String,
        default: "false",
      },
    },

    supervisor: {
      type: String,
      default: "unavailable",
    },
    coSupervisor: {
      type: String,
      default: "unavailable",
    },
  },
  { timestamps: true }
);

//This is created to compare the password(DB password and user enterd password)
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
