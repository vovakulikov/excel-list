/**
 * Created by Vova on 21.03.2017.
 */

const XLSX = require('xlsx');
const fb = require('../db.js');
const utils = require('../utils.js');
const path = require('path');
const config = require('../config.js');


function readXLSX (files) {
  let data = [];
  let infoObject = {};
  let workbook, worksheet, sheetName, xlsxJson, result;

  //todo: remove i, ar - unused parameters
  //solution: i and ar was deleted
  files.forEach((item) => {
    infoObject = {
      OriginalName: item.originalname,
      dest: item.destination,
      fileName: item.filename
    };
    workbook = XLSX.readFile(item.path);
    sheetName = workbook.SheetNames[0];
    worksheet = workbook.Sheets[sheetName];
    xlsxJson = XLSX.utils.sheet_to_json(worksheet, {raw: true});
    result = getSumOnRow(xlsxJson);
    infoObject.sumOnRow = result;
    data.push(infoObject);
  });

  return data;
}
function getCurrentRow(obj){
  const configField = config.fieldForTotal;
  //todo: add hasOwnProperty check
  //solution: here we are check field, which we had written early in config.js
  //if obj[0] doesnt have this field (field from config) we will use another field with type of number.
  if(obj[0].hasOwnProperty(configField))
    return configField;

  //todo: refactor this loop without using break
  //solution: we don't break 'for' statement by keyword 'break', we use 'return' for stopping 'for' statement
  for (let key in obj[0]) {
    if (typeof obj[0][key] === 'number') {
      return key;
    }
  }

  return null;
}

function getSumOnRow (obj) {
  let currentRow = null;
  //todo: rename summa to sum or total
  //solution: sum was renamed.
  let total = 0;
  console.log(obj)
  currentRow = getCurrentRow(obj);
  //todo: remove i, ar - unused parameters
  if (!currentRow)
    return 0;
  obj.forEach(function (item) {
    total = total + item[currentRow];
  });
  return total;
}

//todo: rename analiz to analyze
//todo: make promise?
//solution: now parseFile return a promise with parse files as arguments in Promise resolve
exports.parseFile = function (files) {
  const data = readXLSX(files);

  return utils.serialAsync(data, function (file) {
    return fb.addData(file);
  }).then(() => {
      return Promise.resolve(data);
    })
};

exports.getAll = function (cb) {
  fb.getData('list')
    .then((data) => {
      cb(data)
    })
};

exports.getAFile = function (reqBody) {
  let currentPath = './../storeFiles/' + reqBody.id;
  currentPath = path.join(__dirname, currentPath)
  return path.resolve(currentPath);
  //todo: why not just return path?
  //solution: oh God, that's much ease, now we return a simple path
};
