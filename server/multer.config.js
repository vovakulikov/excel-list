/**
 * Created by Vova on 25.03.2017.
 */

const multer = require('multer');
const config = require('./config.js').config;

const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config._distPath)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
}

exports.config =  multerConfig;
