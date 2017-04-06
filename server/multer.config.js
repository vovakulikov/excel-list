const multer = require('multer');
const config = require('./config.js').config;

const multerConfig = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if(!req.user.email)  {
        cb(null, config._distPath);
      } else{
        cb(null, config._distPath + 'registered/' + req.user.email);
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
};

exports.config =  multerConfig;
