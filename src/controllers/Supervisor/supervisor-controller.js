const Topic = require("../../models/topic-registration");
const User = require("../../models/user");

//Get all members details (groups, supervisors, staff)
exports.GetSupervisorTopicsDetails = (req, res) => {
  const { supervisorId } = req.params;
  Topic.find({ supervisor: supervisorId }).exec((error, topics) => {
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
exports.UpdateTopicStatus = (req, res) => {
  const { topicId } = req.body;
  const { groupId } = req.body;
  if (topicId) {
    Topic.findOneAndUpdate(
      { _id: topicId },
      {
        supervisorStatus: req.body.status1,
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
  if (groupId) {
    User.findOneAndUpdate(
      { username: groupId },
      {
        status: {
          no1: req.body.status2,
          no2: "false",
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
