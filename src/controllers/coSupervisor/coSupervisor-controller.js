const Topic = require("../../models/topic-registration");
const User = require("../../models/user");
const StudentSubmission = require("../../models/student-submission");

// //Get all members details (groups, supervisors, staff)
// exports.GetSupervisorTopicsDetails = (req, res) => {
//   const { coSupervisorId } = req.params;
//   Topic.find({ coSupervisor: coSupervisorId }).exec((error, topics) => {
//     if (error) return res.status(400).json({ error });

//     if (topics) {
//       res.status(200).json({
//         topics,
//       });
//     }
//   });
// };

exports.UpdateCoSupTopicStatus = (req, res) => {
	const { topicId } = req.body;

	if (topicId) {
		Topic.findOneAndUpdate(
			{ _id: topicId },
			{
				coSupervisorName: req.body.coSupervisorName,
				coSupervisorStatus: req.body.status2,
				coSupervisorComment: req.body.coSupComment,
			},
		).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json({ result });
			}
		});
	}
};

//Update student side home page tick status
exports.UpdateStudentCoSupTopicStatus = (req, res) => {
	const { groupId } = req.body;
	if (groupId) {
		User.findOneAndUpdate(
			{ username: groupId },
			{
				status: {
					no1: "true",
					no2: "true",
					no3: "true",
					no4: req.body.status,
					no5: "false",
					no6: "false",
					no7: "false",
					no8: "false",
					no9: "false",
					no10: "false",
				},
			},
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
			},
		);
	} else {
		return res.status(400).json({ error: "Params required" });
	}
};

//Get relevant Topic by id
exports.getAllTopicSubmissions = (req, res) => {
	Topic.find({}).exec((error, topic) => {
		if (error) return res.status(400).json({ error });
		if (topic) {
			res.status(201).json({ topic });
		}
	});
};

//Update supervisor in the User(Student Group) cluster
exports.UpdateCoSupervisorInStudentGroup = (req, res) => {
	const { groupId } = req.params;
	if (groupId) {
		User.findOneAndUpdate(
			{ _id: groupId },
			{
				coSupervisor: req.body.coSupervisorName,
			},
		).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json({ result });
			}
		});
	}
};
