const express = require('express');
const router = express.Router();
const transactionServices = require('./controller');

//middleware
const passport = require('../../middleware/passport');

router.post('/withdraw_request', [passport.authorized], transactionServices.createWithdrawRequest);
router.get('/get_transaction_history', [passport.authorized], transactionServices.getTransactionHistory);





module.exports = router;


