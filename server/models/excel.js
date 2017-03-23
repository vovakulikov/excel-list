/**
 * Created by Vova on 21.03.2017.
 */

let XLSX = require('xlsx')
let fb = require('../db.js')
let utils = require('../Utils.js')

function readXLSX (files) {
  let data = []
  let infoObject = {}
  let workbook, worksheet, sheetName, xlsxJson, result

  files.forEach((item, i, ar) => {
    infoObject = {
      OriginalName: item.originalname,
      dest: item.destination,
      fileName: item.filename
    }
    workbook = XLSX.readFile(item.path)
    sheetName = workbook.SheetNames[0]
    worksheet = workbook.Sheets[sheetName]
    xlsxJson = XLSX.utils.sheet_to_json(worksheet, {raw: true})
    result = getSumOnRow(xlsxJson)
    infoObject.sumOnRow = result
    data.push(infoObject)
  })

  return data
}

function getSumOnRow (obj) {
  let currentRow = null
  let summa = 0

  for (let key in obj[0]) {
    if (typeof obj[0][key] === 'number') {
      currentRow = key
      break
    }
  }
  obj.forEach(function (item, i, ar) {
    summa = summa + item[currentRow]
  })
  return summa
}

exports.analiz = function (files, cb) {
  const data = readXLSX(files)
  utils.serialAsync(data, function (file) {
    return fb.addData(file)
  })
    .then(() => {
      cb(data)
    })
}

exports.getAll = function (cb) {
  fb.getData('list')
    .then((data) => {
      cb(data)
    })
}

exports.getAFile = function (reqBody, cb) {
  let path = './../storeFiles/' + reqBody.id
  cb(path)
}
