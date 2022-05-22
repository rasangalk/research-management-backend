const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      subject,
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
      subject,
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
            username: user.username,
            role: user.role,
            phone: user.phone,
            research_interest: user.research_interest,
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

// exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     message: "Signout successfully...!",
//   });
// };
