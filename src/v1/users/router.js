const express = require('express');
const router = express.Router();
const userController = require('./controller');

const passport = require('../../middleware/passport');


router.get('/profile',[ passport.authorized ], userController.getProfile);
router.get('/credit',[ passport.authorized ], userController.getCredit);

module.exports = router;