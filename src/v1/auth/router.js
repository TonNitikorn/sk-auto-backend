const express = require('express');
const router = express.Router();
const authController = require('./controller');

const passport = require('../../../middleware/passport');


router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/edit_password', [ passport.authorized ],authController.editPassword);


module.exports = router;