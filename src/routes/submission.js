const express = require("express");
const { requireSignin } = require("../common-middleware");
const {
  createSubmission,
  getSubmissions,
  getSubmissionDetailsById,
  UpdateSubmission,
} = require("../controllers/Admin/admin-controller");
const router = express.Router();

router.post("/admin/submission/create", createSubmission);
router.get("/admin/submissions", getSubmissions);
router.get("/admin/submissions/:submissionId", getSubmissionDetailsById);
router.post("/admin/submission/update", UpdateSubmission);

module.exports = router;
