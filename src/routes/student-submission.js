const express = require("express");
const { requireSignin } = require("../common-middleware");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const {
  AddSubmission,
} = require("../controllers/Students/students-controller");
const {
  getStudentSubmissionsByName,
} = require("../controllers/Supervisor/supervisor-controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/student/submission/add",
  requireSignin,
  upload.array("studentSubmission"),
  AddSubmission
);

router.get(
  "/supervisor/student-submission/:assignmentName",
  getStudentSubmissionsByName
);

module.exports = router;
