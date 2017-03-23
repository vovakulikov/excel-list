const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')

const excelController = require('../controllers/excel.js')
const config = require('../config').config
const upload = multer({ storage: config.storage })

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/download/:id', excelController.download)
router.get('/docs', excelController.get)
router.post('/upload', upload.array('uploads', 12), excelController.analiz)

router.get('/', (req, res) => {
  res.end('api works')
})

module.exports = router
