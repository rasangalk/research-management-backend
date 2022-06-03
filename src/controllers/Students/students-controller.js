const Topic = require("../../models/topic-registration");
const StudentSubmission = require("../../models/student-submission");
const User = require("../../models/user");

//Student Group Topic Regstration
exports.registerTopic = (req, res) => {
  const {
    groupId,
    researchInterest,
    topic,
    supervisor,
    coSupervisor,
    supervisorStatus,
    coSupervisorStatus,
    supervisorComment,
    coSupervisorComment,
    coSupervisorName,
    supervisorName,
  } = req.body;

  const topicReg = new Topic({
    groupId,
    researchInterest,
    topic,
    supervisor,
    coSupervisor,
    user: req.user._id,
    supervisorStatus,
    coSupervisorStatus,
    supervisorComment,
    coSupervisorComment,
    coSupervisorName,
    supervisorName,
  });

  topicReg.save((error, topic) => {
    if (error) return res.status(400).json({ error });
    if (topic) {
      res.status(201).json({ topic });
    }
  });
};

//Student Add Submission
exports.AddSubmission = (req, res) => {
  const { status, topic, groupID, researchInterest, supervisorID, panelID } =
    req.body;

  let submissionArray = [];
  if (req.files.length > 0) {
    submissionArray = req.files.map((file) => {
      return { submission: file.filename };
    });
  }

  const submission = new StudentSubmission({
    status,
    topic,
    groupID,
    supervisorID,
    submissionArray,
    researchInterest,
    panelID,
    user: req.user._id,
  });

  submission.save((error, submission) => {
    if (error) return res.status(400).json({ error });
    if (submission) {
      res.status(201).json({ submission });
    }
  });
};

//Get relevant Topic by userId
exports.getTopicByUserId = (req, res) => {
  const { userId } = req.params;
  if (userId) {
    Topic.findOne({ user: userId }).exec((error, topic) => {
      if (error) return res.status(400).json({ error });
      if (topic) {
        res.status(201).json({ topic });
      }
    });
  } else {
    return res.status(400).json({ error: "Something went wrong!!" });
  }
};

//Delete Topic By ID
exports.deleteTopic = (req, res) => {
  const { topicId } = req.params;
  Topic.findOneAndDelete({ _id: topicId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Update student group deatils
exports.UpdateStudentGroupDetails = (req, res) => {
  const { groupId } = req.params;
  if (groupId) {
    User.findOneAndUpdate(
      { _id: groupId },
      {
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
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
