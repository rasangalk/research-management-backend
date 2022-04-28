const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

// exports.studentSignup = (req, res) => {
//   User.findOne({ username: req.body.username })
//   .exec(async(error, user) => {
//     if (user)
//       return res.status(400).json({
//         message: "Group already registered",
//       });

//     const { username, role, password, re_hash_password, fullName, sliit_id, phone, email, specialization } = req.body;

//     const hash_password = await bcrypt.hash(password, 10);

//     const _user = new User({
//       username,
//       role,
//       hash_password,
//       re_hash_password,
//       students:{
//         leader:{
//           fullName,
//           sliit_id,
//           phone,
//           email,
//           specialization
//         },
//         member1:{
//           fullName,
//           sliit_id,
//           phone,
//           email,
//           specialization
//         },
//         member2:{
//           fullName,
//           sliit_id,
//           phone,
//           email,
//           specialization
//         },
//         member3:{
//           fullName,
//           sliit_id,
//           phone,
//           email,
//           specialization
//         }
//       }
//     });

//     _user.save((error, data) => {
//       if (error) {
//         return res.status(400).json({
//           message: "Something went wrong !!",
//           message: error,
//         });
//       }

//       if (data) {
//         return res.status(201).json({
//           message: "Group registered successfully !!",
//         });
//       }
//     });
//   });
// };

// exports.supervisorSignup = (req, res) => {
//   User.findOne({ username: req.body.username })
//   .exec(async(error, user) => {
//     if (user)
//       return res.status(400).json({
//         message: "Supervisor already registered",
//       });

//     const { username, role, password, re_hash_password, fullName, sliit_id, phone, email, research_interest, subject } = req.body;

//     const hash_password = await bcrypt.hash(password, 10);

//     const _user = new User({
//       username,
//       role,
//       hash_password,
//       re_hash_password,
//       fullName,
//       email,
//       sliit_id,
//       phone,
//       research_interest,
//       subject
//     });

//     _user.save((error, data) => {
//       if (error) {
//         return res.status(400).json({
//           message: "Something went wrong !!",
//           message: error,
//         });
//       }

//       if (data) {
//         return res.status(201).json({
//           message: "Supervisor registered successfully !!",
//         });
//       }
//     });
//   });
// };

exports.Signup = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Group already registered",
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
      specialization,
    } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      username,
      role,
      hash_password,
      re_hash_password,
      leader: {
        fullName,
        sliit_id,
        phone,
        email,
        specialization,
      },
      member1: {
        fullName,
        sliit_id,
        phone,
        email,
        specialization,
      },
      member2: {
        fullName,
        sliit_id,
        phone,
        email,
        specialization,
      },
      member3: {
        fullName,
        sliit_id,
        phone,
        email,
        specialization,
      },
      // students: {
       
      // },
    });

    const _user1 = new User({
      username,
      role,
      hash_password,
      re_hash_password,
      research_interest,
      subject,
      fullName,
      sliit_id,
      phone,
      email,
    });

    if (req.body.role == "student") {
      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong Student !!",
            message: error,
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Group registered successfully !!",
          });
        }
      });
    } else {
      _user1.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong Supervisor !!",
            message: error,
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Supervisor registered successfully !!",
          });
        }
      });
    }
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
        const {
          username,
          role,
          password,
          re_hash_password,
          fullName,
          sliit_id,
          phone,
          email,
          specialization,
          research_interest,
          subject,
        } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: {
            username,
            role,
            password,
            re_hash_password,
            fullName,
            sliit_id,
            phone,
            email,
            specialization,
            research_interest,
            subject,
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

// exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     message: "Signout successfully...!",
//   });
// };
