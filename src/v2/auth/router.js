const express = require('express');
const router = express.Router();
const authController = require('./controller');
const limiter = require('../../middleware/rate_limiter');


router.post('/login' , [ limiter ] , authController.login);
router.post('/login/verify' , [ limiter ] , authController.verifyOTP);
router.post('/register' , [ limiter ] , authController.registerOTP);
router.post('/register/verify' , [ limiter ] , authController.registerverifyOTP);


module.exports = router;