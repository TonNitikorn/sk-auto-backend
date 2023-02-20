const express = require('express');
const router = express.Router();

const authRouter = require('./auth/router');

//create router prefix /v2
router.use('/auth', authRouter);




module.exports = router;