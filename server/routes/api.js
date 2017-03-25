const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

const excelController = require('../controllers/excel.js');
const config = require('../config').config;
const multerStorge = require('../multer.config.js').config;
const upload = multer({ storage: multerStorge.storage });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/download/:id', excelController.download);
router.get('/docs', excelController.getAll);
// todo: rename analiz to analyze
// todo: analyze what? what does analyze do?
// solution: rename analiz to saveFiles, for understand what exactly does this function
router.post('/upload', upload.array('uploads'), excelController.saveFiles);
// todo: 12 is magic number
// solution: remove 12, Now we can upload no-limit number of file

router.get('/', (req, res) => {
  res.end('api works');
});

module.exports = router;
