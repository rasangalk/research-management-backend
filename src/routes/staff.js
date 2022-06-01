const express = require("express");
const { requireSignin, studentMiddleware } = require("../common-middleware");
const { getPanelByMemberId } = require("../controllers/Staff/staff-controller");
const router = express.Router();

router.get("/staff/getPanel/:panelId", getPanelByMemberId);
module.exports = router;
