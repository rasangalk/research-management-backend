const express = require("express");

const { getTestHelloId } = require("../controllers/test-controller");

const router = express.Router();

router.get("/", getTestHelloId);

module.exports = router;
