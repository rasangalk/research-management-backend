const Topic = require("../../models/topic-registration");

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
