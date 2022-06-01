const Template = require("../../models/template");
const Submission = require("../../models/submission");
const Panel = require("../../models/panel");
const MarkingSchema = require("../../models/markingSchem");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

//Admin add template
exports.AddTemplate = (req, res) => {
  const { caption } = req.body;

  let researchTemplates = [];

  if (req.files.length > 0) {
    researchTemplates = req.files.map((file) => {
      return { template: file.filename };
    });
  }

  const template = new Template({
    caption,
    researchTemplates,
    // createdBy: req.user._id,
  });

  template.save((error, template) => {
    if (error) return res.status(400).json({ error });
    if (template) {
      res.status(201).json({ template });
    }
  });
};

//Admin Delete relevant template by id
exports.DeleteTemplate = (req, res) => {
  const { templateId } = req.params;
  Template.findOneAndDelete({ _id: templateId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Get all the templates
exports.getTemplates = (req, res) => {
  Template.find({}).exec((error, templates) => {
    if (error) return res.status(400).json({ error });

    if (templates) {
      res.status(200).json({
        templates,
      });
    }
  });
};

//Admin create submission
exports.createSubmission = (req, res) => {
  const { caption, description, deadlineDate, deadlineTime } = req.body;

  const submission = new Submission({
    caption,
    description,
    deadlineDate,
    deadlineTime,
  });

  submission.save((error, submission) => {
    if (error) return res.status(400).json({ error });
    if (submission) {
      res.status(201).json({ submission });
    }
  });
};

//Get all the submissions
exports.getSubmissions = (req, res) => {
  Submission.find({}).exec((error, submissions) => {
    if (error) return res.status(400).json({ error });

    if (submissions) {
      res.status(200).json({
        submissions,
      });
    }
  });
};

//Get relevant created submission by id
exports.getSubmissionDetailsById = (req, res) => {
  const { submissionId } = req.params;
  if (submissionId) {
    Submission.findOne({ _id: submissionId }).exec((error, submission) => {
      if (error) return res.status(400).json({ error });
      if (submission) {
        res.status(201).json({ submission });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update relevant submission
exports.UpdateSubmission = (req, res) => {
  const { submissionId } = req.body;
  if (submissionId) {
    Submission.findOneAndUpdate(
      { _id: submissionId },
      {
        caption: req.body.caption,
        description: req.body.description,
        deadlineDate: req.body.deadlineDate,
        deadlineTime: req.body.deadlineTime,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};

//Delete relevant submission
exports.DeleteSubmission = (req, res) => {
  const { submissionId } = req.params;
  Submission.findOneAndDelete({ _id: submissionId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Add panel
exports.addPanel = (req, res) => {
  Panel.findOne({ panelId: req.body.panelId }).exec(async (error, panel) => {
    if (panel)
      return res.status(400).json({
        message: "Panel already created",
      });

    const _panel = new Panel({
      panelId: req.body.panelId,
      panelMembers: {
        member1: {
          memberId: req.body.panelMembers.member1.memberId,
          fullName: req.body.panelMembers.member1.fullName,
          username: req.body.panelMembers.member1.username,
        },
        member2: {
          memberId: req.body.panelMembers.member2.memberId,
          fullName: req.body.panelMembers.member2.fullName,
          username: req.body.panelMembers.member2.username,
        },
        member3: {
          memberId: req.body.panelMembers.member3.memberId,
          fullName: req.body.panelMembers.member3.fullName,
          username: req.body.panelMembers.member3.username,
        },
      },
    });

    console.log(req.body.panelMembers.member3);
    _panel.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
          error: error,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Panel created successfully!",
        });
      }
    });
  });
};

//Get all panel details
exports.GetAllPanelDetails = (req, res) => {
  Panel.find({}).exec((error, panels) => {
    if (error) return res.status(400).json({ error });

    if (panels) {
      res.status(200).json({
        panels,
      });
    }
  });
};

//Get relevant Panel by id
exports.getPanelById = (req, res) => {
  const { panelId } = req.params;
  if (panelId) {
    Panel.findOne({ _id: panelId }).exec((error, panel) => {
      if (error) return res.status(400).json({ error });
      if (panel) {
        res.status(201).json({ panel });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update panel details
exports.UpdatePanelMembers = (req, res) => {
  Panel.findOneAndUpdate(
    { _id: req.body.panelId },
    {
      _id: req.body.panelId,
      panelMembers: {
        member1: {
          memberId: req.body.panelMembers.member1.memberId,
          fullName: req.body.panelMembers.member1.fullName,
          username: req.body.panelMembers.member1.username,
        },
        member2: {
          memberId: req.body.panelMembers.member2.memberId,
          fullName: req.body.panelMembers.member2.fullName,
          username: req.body.panelMembers.member2.username,
        },
        member3: {
          memberId: req.body.panelMembers.member3.memberId,
          fullName: req.body.panelMembers.member3.fullName,
          username: req.body.panelMembers.member3.username,
        },
      },
    }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
};

//Admin create Marking Schema
exports.addMarkingSchema = (req, res) => {
  console.log(req.body);
  // const {
  //   assignmentName,
  //   namingField1,
  //   namingField2,
  //   namingField3,
  //   markingField1,
  //   markingField2,
  //   markingField3,
  // } = req.body;

  const markingSchema = new MarkingSchema({
    assignmentName: req.body.assignmentName,
    markingScheme: req.body.markingScheme,
  });

  markingSchema.save((error, markingSchema) => {
    if (error) return res.status(400).json({ error });
    if (markingSchema) {
      res.status(201).json({ markingSchema });
    }
  });
};

//Get all marking schemas
exports.GetAllMarkingSchemas = (req, res) => {
  MarkingSchema.find({}).exec((error, markingSchemas) => {
    if (error) return res.status(400).json({ error });

    if (markingSchemas) {
      res.status(200).json({
        markingSchemas,
      });
    }
  });
};

//Get relevant Marking Schema by id
exports.getMarkingSchemaById = (req, res) => {
  const { markingSchemaId } = req.params;
  if (markingSchemaId) {
    MarkingSchema.findOne({ _id: markingSchemaId }).exec(
      (error, markingSchema) => {
        if (error) return res.status(400).json({ error });
        if (markingSchema) {
          res.status(201).json({ markingSchema });
        }
      }
    );
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update panel details
exports.UpdateMarkingSchema = (req, res) => {
  const { markingSchemaId } = req.params;
  if (markingSchemaId) {
    MarkingSchema.findOneAndUpdate(
      { _id: markingSchemaId },
      {
        assignmentName: req.body.assignmentName,
        namingField1: req.body.namingField1,
        namingField2: req.body.namingField2,
        namingField3: req.body.namingField3,
        markingField1: req.body.markingField1,
        markingField2: req.body.markingField2,
        markingField3: req.body.markingField3,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};

//Delete Member By ID
exports.DeleteMarkingSchema = (req, res) => {
  const { schemaId } = req.params;
  MarkingSchema.findOneAndDelete({ _id: schemaId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Admin add Member (staff-Member)
exports.addStaffMember = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Staff member already registered",
        user,
      });

    const {
      username,
      role,
      password,
      re_hash_password,
      fullName,
      sliit_id,
      phone,
      email,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _member = new User({
      username,
      role,
      hash_password,
      re_hash_password,
      fullName,
      email,
      sliit_id,
      phone,
    });

    _member.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!!!!",
          error: error,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Staff Member registered successfully!",
        });
      }
    });
  });
};

//Get all members details (groups, supervisors, staff)
exports.GetAllMemebrDetails = (req, res) => {
  User.find({ $or: [{ role: "staff" }, { role: "supervisor" }] }).exec(
    (error, members) => {
      if (error) return res.status(400).json({ error });

      if (members) {
        res.status(200).json({
          members,
        });
      }
    }
  );
};

//Delete Member By ID
exports.DeleteMember = (req, res) => {
  const { memberId } = req.params;
  User.findOneAndDelete({ _id: memberId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Get all Staff members
exports.GetAllStaffMemebrDetails = (req, res) => {
  User.find({ role: "staff" }).exec((error, staffMembers) => {
    if (error) return res.status(400).json({ error });

    if (staffMembers) {
      res.status(200).json({
        staffMembers,
      });
    }
  });
};

//Get all Supervisor members
exports.GetAllSupervisorDetails = (req, res) => {
  User.find({ role: "supervisor" }).exec((error, supservisors) => {
    if (error) return res.status(400).json({ error });

    if (supservisors) {
      res.status(200).json({
        supservisors,
      });
    }
  });
};

//Update Member details
exports.UpdateMemberDetails = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.memberId },
    {
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      sliit_id: req.body.sliit_id,
    }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
};
