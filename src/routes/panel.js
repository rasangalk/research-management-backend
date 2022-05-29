const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  addPanel,
  GetAllPanelDetails,
  getPanelById,
  UpdatePanelMembers,
} = require("../controllers/Admin/admin-controller");

const router = express.Router();

router.post("/admin/panel/add", addPanel, requireSignin);
router.get(
  "/admin/panel-details",
  requireSignin,
  //adminMiddleware,
  GetAllPanelDetails
);
router.get(
  "/admin/panel-details/:panelId",
  requireSignin,
  //adminMiddleware,
  getPanelById
);
router.patch(
  "/admin/panel-details/update/:panelId",
  requireSignin,
  //adminMiddleware,
  UpdatePanelMembers
);

module.exports = router;
