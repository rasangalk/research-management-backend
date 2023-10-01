const express = require('express');
const {
  requireSignin,
  studentMiddleware,
  staffMiddleware,
} = require('../common-middleware');
const { getPanelByMemberId } = require('../controllers/Staff/staff-controller');
const router = express.Router();

router.get('/staff/getPanel/:panelId', staffMiddleware, getPanelByMemberId);
module.exports = router;
