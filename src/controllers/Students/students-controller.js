const Topic = require("../../models/topic-registration");
const StudentSubmission = require("../../models/student-submission");

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
  const { status } = req.body;

  let submissionArray = [];
  if (req.files.length > 0) {
    submissionArray = req.files.map((file) => {
      return { submission: file.filename };
    });
  }

  const submission = new StudentSubmission({
    status,
    submissionArray,
    user: req.user._id,
  });

  submission.save((error, submission) => {
    if (error) return res.status(400).json({ error });
    if (submission) {
      res.status(201).json({ submission });
    }
  });
};
