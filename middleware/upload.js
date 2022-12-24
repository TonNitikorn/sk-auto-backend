const util = require("util");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../public/uploads`));
  },
  filename: (req, file, callback) => {

    var filename = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, filename);
  }
});
// limit file size 5MB
var limits = { fileSize: 5 * 1024 * 1024 };

var uploadFiles = multer({ storage: storage , limits: limits}).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;