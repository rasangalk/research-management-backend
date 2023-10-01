const express = require('express');
const { requireSignin, studentMiddleware } = require('../common-middleware');
const {
  UpdateStudentCoSupTopicStatus,
  UpdateCoSupTopicStatus,
} = require('../controllers/coSupervisor/coSupervisor-controller');
const router = express.Router();
const {
  registerTopic,
  getTopicByUserId,
  deleteTopic,
} = require('../controllers/Students/students-controller');
const {
  GetSupervisorTopicsDetails,
  getTopicById,
  UpdateTopicStatus,
  UpdateStudentTopicStatus,
} = require('../controllers/Supervisor/supervisor-controller');

router.post(
  '/student/topic/register',
  requireSignin,
  studentMiddleware,
  registerTopic
);

router.get(
  '/supervisor/topics/:supervisorId',
  requireSignin,
  GetSupervisorTopicsDetails
);

router.get('/supervisor/getTopics/:topicId', requireSignin, getTopicById);

router.patch('/sueprvisor/topic/update', requireSignin, UpdateTopicStatus);
router.patch(
  '/coSueprvisor/topic/update',
  requireSignin,
  UpdateCoSupTopicStatus
);
router.patch(
  '/sueprvisor/topic/updateTopicTick',
  requireSignin,
  UpdateStudentTopicStatus
);

router.patch(
  '/coSueprvisor/topic/updateTopicTick',
  requireSignin,
  UpdateStudentCoSupTopicStatus
);

router.get(
  '/student/getTopic/:userId',
  requireSignin,
  studentMiddleware,
  getTopicByUserId
);
router.delete(
  '/student/deleteTopic/:topicId',
  requireSignin,
  studentMiddleware,
  deleteTopic
);

module.exports = router;
