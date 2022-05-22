const express = require("express");
const {
  signin,
  studentSignup,
  supervisorSignup,
  getGroupDetailsById,
} = require("../controllers/auth-controller");
// const { Signupp } = require("../controllers/demo-controller");
// const { studentSignup } = require("../controllers/register-auth-controller");
// const {
//   supervisorSignup,
// } = require("../controllers/supervisor-register-auth-controller");

const {
  isRequestValidated,
  validateSignupRequest,
  validateSigninRequest,
} = require("../validators/auth");
const router = express.Router();

router.post(
  "/student/signup",
  studentSignup,
  isRequestValidated,
  validateSignupRequest
);

router.post(
  "/supervisor/signup",
  supervisorSignup,
  isRequestValidated,
  validateSigninRequest
);

router.post("/signin", signin);
router.get("/student/group-details/:groupId", getGroupDetailsById);

module.exports = router;
