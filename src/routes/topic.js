const express = require("express");
const { requireSignin, studentMiddleware } = require("../common-middleware");
const router = express.Router();
const {
  registerTopic,
} = require("../controllers/Students/students-controller");
const {
  GetSupervisorTopicsDetails,
  getTopicById,
  UpdateTopicStatus,
} = require("../controllers/Supervisor/supervisor-controller");

router.post(
  "/student/topic/register",
  requireSignin,
  studentMiddleware,
  registerTopic
);

router.get(
  "/supervisor/topics/:supervisorId",
  requireSignin,
  GetSupervisorTopicsDetails
);

router.get("/supervisor/getTopics/:topicId", requireSignin, getTopicById);

router.patch("/sueprvisor/topic/update", requireSignin, UpdateTopicStatus);
module.exports = router;
