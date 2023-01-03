const express = require('express');
const router = express.Router();
const bankController = require('./controller');

const passport = require('../../middleware/passport');


router.get('/bank_deposit',[ passport.authorized ], bankController.getBankList);

module.exports = router;