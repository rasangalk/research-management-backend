const express = require("express");
const { googleOauth2 } = require("../common-middleware");
const { studentSignup, signin } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/auth/google/signup", googleOauth2, studentSignup);

router.post("/auth/google/signin", googleOauth2, signin);

module.exports = router;
