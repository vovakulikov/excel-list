const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");

var excelController = require('../controllers/excel.js');
var config = require('../config').config;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config._distPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname)
  }
});
var upload = multer({ storage: storage });
console.log(config);

router.get('/download/:id', excelController.download)
router.get('/docs',excelController.get);
router.post("/upload",upload.array("uploads", 12),excelController.analiz);


/* GET api listing. */
router.get('/', (req, res)=>{
  res.end('api works')
});

module.exports = router;
