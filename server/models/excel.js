/**
 * Created by Vova on 21.03.2017.
 */

const XLSX = require('xlsx');
const fb = require('../db.js');
const utils = require('../utils.js');
const path = require('path');
const config = require('../config.js');


function readXLSX (files) {
  const data = [];
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

  /**
   *  // todo: just for example. it could be rewritten like that
   return files.map(item => ({
    OriginalName: item.originalname,
    dest: item.destination,
    fileName: item.filename,
    sumOnRow: (function () {
      const workbook = XLSX.readFile(item.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const xlsxJson = XLSX.utils.sheet_to_json(worksheet, {raw: true});

      return getSumOnRow(xlsxJson);
    })()
  }));
   */
}

function getCurrentRow(obj) {
  //todo: what is obj? what it contains. rename pls
  const configField = config.fieldForTotal;

  //todo: also, i can't quite understand why are you accessing obj[0]
  // in such situations obj[0] should be assigned to another self-describable variable at first
  if (obj[0].hasOwnProperty(configField)) {
    return configField;
  }

  for (const key in obj[0]) {
    if (obj[0].hasOwnProperty(key) && typeof obj[0][key] === 'number') {
      return key;
    }
  }

  return 0;
}

function getSumOnRow (obj) {
  let currentRow = null;
  //todo: rename summa to sum or total
  //solution: sum was renamed.
  let total = 0;

  currentRow = getCurrentRow(obj);
  //todo: remove i, ar - unused parameters
  if (!currentRow) return 0;

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
  });
};

exports.parsingFiles = function(files){
  return readXLSX(files);
};

exports.getAll = function (cb) {
  fb.getData('list')
    .then((data) => {
      cb(data);
    });

};

exports.getAFile = function (reqBody) {
  let currentPath = './../storeFiles/' + reqBody.id;
  currentPath = path.join(__dirname, currentPath);

  return path.resolve(currentPath);
};
