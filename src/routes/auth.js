const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addStaffMember,
  GetAllMemebrDetails,
  DeleteMember,
} = require("../controllers/Admin/admin-controller");
const {
  signin,
  studentSignup,
  supervisorSignup,
  getGroupDetailsById,
  GetAllGroupDetails,
  UpdatePanel,
  getMemberDetailsById,
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
router.get(
  "/student/group-details/:groupId",
  requireSignin,
  getGroupDetailsById,
  validateSigninRequest
);

router.post(
  "/admin/staffMember/add",
  requireSignin,
  //adminMiddleware,
  addStaffMember
);

router.get("/admin/group-details", requireSignin, GetAllGroupDetails);
router.get(
  "/admin/members",
  requireSignin,
  //adminMiddleware,
  GetAllMemebrDetails
);
router.post("/admin/group-detail/update/:groupId", UpdatePanel, requireSignin);
router.get(
  "/admin/member/:memberId",
  requireSignin,
  // adminMiddleware,
  getMemberDetailsById
);

router.delete("/admin/members/delete/:memberId", DeleteMember);

module.exports = router;
