const express = require('express');
const router = express.Router();
const transactionServices = require('./controller');

//middleware
const passport = require('../../middleware/passport');

router.post('/withdraw_request', [passport.authorized], transactionServices.createWithdrawRequest);





module.exports = router;


