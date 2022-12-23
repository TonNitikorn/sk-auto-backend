const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

const passport = require('../middleware/passport');


router.get('/profile',[ passport.authorized ], userController.getProfile);
module.exports = router;