const Topic = require("../../models/topic-registration");
const User = require("../../models/user");
const StudentSubmission = require("../../models/student-submission");

//Get all members details (groups, supervisors, staff)
exports.GetSupervisorTopicsDetails = (req, res) => {
  const { supervisorId } = req.params;
  Topic.find({
    $or: [{ supervisor: supervisorId }, { coSupervisor: supervisorId }],
  }).exec((error, topics) => {
    if (error) return res.status(400).json({ error });

    if (topics) {
      res.status(200).json({
        topics,
      });
    }
  });
};

//Get relevant Topic by id
exports.getTopicById = (req, res) => {
  const { topicId } = req.params;
  if (topicId) {
    Topic.findOne({ _id: topicId }).exec((error, topic) => {
      if (error) return res.status(400).json({ error });
      if (topic) {
        res.status(201).json({ topic });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Update Topic Status
// exports.UpdateTopicStatus = (req, res) => {
//   const { topicId } = req.body;
//   const { groupId } = req.body;

//   if (topicId) {
//     Topic.findOneAndUpdate(
//       { _id: topicId },
//       {
//         supervisorStatus: req.body.status1,
//       },
//       {
//         supervisorComment: req.body.supComment,
//       }
//     ).exec((error, result) => {
//       if (error) return res.status(400).json({ error });
//       if (result) {
//         res.status(202).json({ result });
//       }
//     });
//   }
//   if (groupId) {
//     User.findOneAndUpdate(
//       { username: groupId },
//       {
//         status: {
//           no1: req.body.status2,
//           no2: "false",
//           no3: "false",
//           no4: "false",
//           no5: "false",
//           no6: "false",
//           no7: "false",
//           no8: "false",
//           no9: "false",
//           no10: "false",
//         },
//       }
//     );
//   }
// };

exports.UpdateTopicStatus = (req, res) => {
  const { topicId } = req.body;
  const { groupId } = req.body;

  // if (topicId) {
  //   Topic.findOneAndUpdate(
  //     { _id: topicId },
  //     {
  //       supervisorStatus: req.body.status1,
  //     },
  //     {
  //       supervisorComment: req.body.supComment,
  //     }
  //   );
  // }
  if (topicId) {
    Topic.findOneAndUpdate(
      { _id: topicId },
      {
        supervisorName: req.body.supervisorName,
        supervisorStatus: req.body.status1,
        supervisorComment: req.body.supComment,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};

//Update student side home page tick status
exports.UpdateStudentTopicStatus = (req, res) => {
  const { groupId } = req.body;
  if (groupId) {
    User.findOneAndUpdate(
      { username: groupId },
      {
        status: {
          no1: "true",
          no2: req.body.status,
          no3: "false",
          no4: "false",
          no5: "false",
          no6: "false",
          no7: "false",
          no8: "false",
          no9: "false",
          no10: "false",
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

//Get relevant Topic by id
exports.getStudentSubmissionsByName = (req, res) => {
  const { assignmentName } = req.params;
  if (assignmentName) {
    StudentSubmission.find({ status: assignmentName }).exec(
      (error, submission) => {
        if (error) return res.status(400).json({ error });
        if (submission) {
          res.status(201).json({ submission });
        }
      }
    );
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//Get relevant Topic by id
exports.getStudentSubmission = (req, res) => {
  const { assignment } = req.params;
  StudentSubmission.find({ _id: assignment }).exec((error, assignment) => {
    if (error) return res.status(400).json({ error });
    if (assignment) {
      res.status(201).json({ assignment });
    }
  });
};

//Get all Topics
exports.getAllStudentSubmissions = (req, res) => {
  StudentSubmission.find({}).exec((error, allSubmissions) => {
    if (error) return res.status(400).json({ error });
    if (allSubmissions) {
      res.status(201).json({ allSubmissions });
    }
  });
};

//Get relevant Topic by id
exports.evaluateStudentSubmissions = (req, res) => {
  const { assignment } = req.params;
  StudentSubmission.findOneAndUpdate(
    { _id: assignment },
    {
      comment: req.body.comment,
      isViewed: req.body.isViewed,
      marks: req.body.marks,
    }
  ).exec((error, assignment) => {
    if (error) return res.status(400).json({ error });
    if (assignment) {
      res.status(201).json({ assignment });
    }
  });
};
