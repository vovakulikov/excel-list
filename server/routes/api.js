const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excel.js');

router.get('/download/:id', excelController.download);
router.get('/docs', excelController.getAll);
router.get('/', (req, res) => {
  res.end('api works');
});

module.exports = router;
