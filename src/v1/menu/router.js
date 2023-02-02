const express = require('express');
const router = express.Router();
const gameController = require('./controller');

const passport = require('../../middleware/passport');


router.get('/game_menu', gameController.getGameType);
router.get('/get_web_setting', gameController.getWebSettingAll);
router.get('/get_web_setting_logo', gameController.getWebSettingLogo);


module.exports = router;