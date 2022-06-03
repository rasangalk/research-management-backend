const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Student Signup
exports.studentSignup = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Group already registered",
      });

    const hash_password = await bcrypt.hash(req.body.password, 10);

    const _student = new User({
      username: req.body.username,
      role: req.body.role,
      hash_password: hash_password,
      re_hash_password: req.body.re_hash_password,
      panel: req.body.panel,
      students: {
        leader: {
          fullName: req.body.students.leader.fullName,
          sliit_id: req.body.students.leader.sliit_id,
          phone: req.body.students.leader.phone,
          email: req.body.students.leader.email,
          specialization: req.body.students.leader.specialization,
        },
        member1: {
          fullName: req.body.students.member1.fullName,
          sliit_id: req.body.students.member1.sliit_id,
          phone: req.body.students.member1.phone,
          email: req.body.students.member1.email,
          specialization: req.body.students.member1.specialization,
        },
        member2: {
          fullName: req.body.students.member2.fullName,
          sliit_id: req.body.students.member2.sliit_id,
          phone: req.body.students.member2.phone,
          email: req.body.students.member2.email,
          specialization: req.body.students.member2.specialization,
        },
        member3: {
          fullName: req.body.students.member3.fullName,
          sliit_id: req.body.students.member3.sliit_id,
          phone: req.body.students.member3.phone,
          email: req.body.students.member3.email,
          specialization: req.body.students.member3.specialization,
        },
      },
      status: {
        no1: req.body.status.no1,
        no2: req.body.status.no2,
        no3: req.body.status.no3,
        no4: req.body.status.no4,
        no5: req.body.status.no5,
        no6: req.body.status.no6,
        no7: req.body.status.no7,
        no8: req.body.status.no8,
        no9: req.body.status.no9,
        no10: req.body.status.no10,
      },
      supervisor: req.body.supervisor,
      coSupervisor: req.body.coSupervisor,
    });

    _student.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Student: Something went wrong!",
          error: error,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Group registered successfully!",
        });
      }
    });
  });
};

//Supervisor Signup
exports.supervisorSignup = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Supervisor already registered",
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
      research_interest,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _supervisor = new User({
      username,
      role,
      hash_password,
      re_hash_password,
      fullName,
      email,
      sliit_id,
      phone,
      research_interest,
    });

    _supervisor.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
          error: error,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Supervisor registered successfully!",
        });
      }
    });
  });
};

//All users Signin
exports.signin = (req, res) => {
  User.findOne({ username: req.body.username }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            role: user.role,
            phone: user.phone,
            research_interest: user.research_interest,
            panel: user.panel,
            email: user.email,
            sliit_id: user.sliit_id,
            students: {
              leader: {
                fullName: user.students.leader.fullName,
                sliit_id: user.students.leader.sliit_id,
                phone: user.students.leader.phone,
                email: user.students.leader.email,
                specialization: user.students.leader.specialization,
              },
              member1: {
                fullName: user.students.member1.fullName,
                sliit_id: user.students.member1.sliit_id,
                phone: user.students.member1.phone,
                email: user.students.member1.email,
                specialization: user.students.member1.specialization,
              },
              member2: {
                fullName: user.students.member2.fullName,
                sliit_id: user.students.member2.sliit_id,
                phone: user.students.member2.phone,
                email: user.students.member2.email,
                specialization: user.students.member2.specialization,
              },
              member3: {
                fullName: user.students.member3.fullName,
                sliit_id: user.students.member3.sliit_id,
                phone: user.students.member3.phone,
                email: user.students.member3.email,
                specialization: user.students.member3.specialization,
              },
            },
          },
        });
      } else {
        return res.status(400).json({
          message: "Password is incorrent !!",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong !!" });
    }
  });
};

//Get relevant student group deatils by Id
exports.getGroupDetailsById = (req, res) => {
  const { groupId } = req.params;
  if (groupId) {
    User.findOne({ _id: groupId }).exec((error, group) => {
      if (error) return res.status(400).json({ error });
      if (group) {
        res.status(201).json({ group });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Get all students groups details
exports.GetAllGroupDetails = (req, res) => {
  User.find({ role: "student" }).exec((error, groups) => {
    if (error) return res.status(400).json({ error });

    if (groups) {
      res.status(200).json({
        groups,
      });
    }
  });
};

//Update student group panel
exports.UpdatePanel = (req, res) => {
  const { groupId } = req.params;
  if (groupId) {
    User.findOneAndUpdate(
      { _id: groupId },
      {
        panel: req.body.panel,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};

//Get relevant member deatils by Id
exports.getMemberDetailsById = (req, res) => {
  const { memberId } = req.params;
  if (memberId) {
    User.findOne({
      $or: [{ role: "staff" }, { role: "supervisor" }],
      $and: [{ _id: memberId }],
    }).exec((error, member) => {
      if (error) return res.status(400).json({ error });
      if (member) {
        res.status(201).json({ member });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update panel details
exports.UpdateStudentGrpPanel = (req, res) => {
  //const { groupId } = req.body.groupId;
  //if (groupId) {
  User.findOneAndUpdate(
    { _id: req.body.groupId },
    {
      panel: req.body.panel,
    }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
  //}
};

// //Update Staff Member
// exports.UpdateStaffMember = (req, res) => {
//   const { submissionId } = req.body;
//   if (submissionId) {
//     Submission.findOneAndUpdate(
//       { _id: submissionId },
//       {
//         caption: req.body.caption,
//         description: req.body.description,
//         deadlineDate: req.body.deadlineDate,
//         deadlineTime: req.body.deadlineTime,
//       }
//     ).exec((error, result) => {
//       if (error) return res.status(400).json({ error });
//       if (result) {
//         res.status(202).json({ result });
//       }
//     });
//   }
// };

// exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     message: "Signout successfully...!",
//   });
// };
