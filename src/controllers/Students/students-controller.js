const Topic = require("../../models/topic-registration");

exports.registerTopic = (req, res) => {
  const {
    researchInterest,
    topic,
    supervisor,
    coSupervisor,
    supervisorStatus,
    coSupervisorStatus,
  } = req.body;

  const topicReg = new Topic({
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
