const express = require('express');
const router = express.Router();
const multer = require('multer');
const excelController = require('../controllers/excel.js');
const multerStorge = require('../multer.config.js').config;
const upload = multer({storage: multerStorge.storage});

router.get('/download/:id', excelController.download);
router.get('/docs', excelController.getAll);

router.post('/upload', upload.array('uploads'), excelController.saveFiles);
router.get('/', (req, res) => {
  res.end('api works');
});

module.exports = router;
