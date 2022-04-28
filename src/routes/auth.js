const express = require('express');
const { signin } = require('../controllers/auth-controller');
const { Signupp } = require('../controllers/demo-controller');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.post('/user/signup',Signupp,isRequestValidated,validateSignupRequest);
// router.post('/supervisor/signup',supervisorSignup, isRequestValidated, validateSigninRequest);
router.post('/signin',signin);

module.exports = router;