const express = require('express');
const router = express.Router();
const gameController = require('./game_controller');

const passport = require('../../middleware/passport');


router.get('/game_menu',[ passport.authorized ], gameController.getGameType);
module.exports = router;