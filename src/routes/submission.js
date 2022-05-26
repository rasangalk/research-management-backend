const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  createSubmission,
  getSubmissions,
  getSubmissionDetailsById,
  UpdateSubmission,
  DeleteSubmission,
} = require("../controllers/Admin/admin-controller");
const router = express.Router();

router.post(
  "/admin/submission/create",
  requireSignin,
  adminMiddleware,
  createSubmission
);
router.get("/admin/submissions", requireSignin, getSubmissions);
router.get("/admin/submissions/:submissionId", getSubmissionDetailsById);
router.post(
  "/admin/submission/update",
  requireSignin,
  adminMiddleware,
  UpdateSubmission
);

router.delete("/admin/submissions/delete/:submissionId", DeleteSubmission);

module.exports = router;
