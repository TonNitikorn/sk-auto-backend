const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload_controller');


router.post('/', uploadController.multipleUpload);



module.exports = router;