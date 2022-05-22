const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const {
  registerTopic,
} = require("../controllers/Students/students-controller");

router.post("/student/topic/register", requireSignin, registerTopic);
// router.get("/admin/getTheaters", GetAllTheaters);

module.exports = router;
