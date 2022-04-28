const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.Signupp = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Group already registered",
      });

    // const {
    //   username,
    //   role,
    //   password,
    //   re_hash_password,
    //   leader: {
    //     fullName,
    //     sliit_id,
    //     phone,
    //     email,
    //     specialization,
    //   },
    //   member1: {
    //     fullName,
    //     sliit_id,
    //     phone,
    //     email,
    //     specialization,
    //   },
    //   member2: {
    //     fullName,
    //     sliit_id,
    //     phone,
    //     email,
    //     specialization,
    //   },
    //   member3: {
    //     fullName,
    //     sliit_id,
    //     phone,
    //     email,
    //     specialization,
    //   }
    // } = req.body;

    const hash_password = await bcrypt.hash(req.body.password, 10);

    const _user = new User({
      username: req.body.username,
      role: req.body.role,
      hash_password: hash_password,
      re_hash_password: req.body.re_hash_password,
      student:{
        member1: {
            fullName: req.body.student.member1.fullName,
            sliit_id: req.body.student.member1.sliit_id,
            phone: req.body.student.member1.phone,
            email: req.body.student.member1.email,
            specialization: req.body.student.member1.specialization,
        },
        // member2: {
        //     fullName: req.body.student.member2.fullName,
        //     sliit_id: req.body.student.member2.sliit_id,
        //     phone: req.body.student.member2.phone,
        //     email: req.body.student.member2.email,
        //     specialization: req.body.student.member2.specialization,
        // },  
      }
     
    //   member1: {
    //     fullName: req.body.fullName,
    //     sliit_id: req.body.sliit_id,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     specialization: req.body.specialization,
    //   },
    //   member2: {
    //     fullName: req.body.fullName,
    //     sliit_id: req.body.sliit_id,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     specialization: req.body.specialization,
    //   },
    //   member3: {
    //     fullName: req.body.fullName,
    //     sliit_id: req.body.sliit_id,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     specialization: req.body.specialization,
    //   },
    });

    //save student details
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
  });
};


