const express = require("express");
const { requireSignin, studentMiddleware } = require("../common-middleware");
const router = express.Router();
const {
  registerTopic,
} = require("../controllers/Students/students-controller");

router.post(
  "/student/topic/register",
  requireSignin,
  studentMiddleware,
  registerTopic
);

module.exports = router;
