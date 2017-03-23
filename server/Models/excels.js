/**
 * Created by Vova on 21.03.2017.
 */

var XLSX = require('xlsx');
var fb = require('../db.js');
var utils = require('../Utils.js');

function readXLSX(files){
  let data = [];
    files.forEach((item,i,ar)=>{

        let infoObject = {
          OriginalName:item.originalname,
          dest: item.destination,
          fileName: item.filename
        };

        var workbook = XLSX.readFile(item.path);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        let xlsx_json = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log(xlsx_json);
        let sum = getSumOnRow(xlsx_json);
        console.log(sum);


        infoObject.sumOnRow = sum;
        data.push(infoObject);
    });

    return data;
}

function getSumOnRow(obj){
  let currentRow = null;
  for(let key in obj[0]){
    // console.log(key,obj[0][key])
    if(typeof obj[0][key] == 'number'){
      currentRow = key;
      console.log(key)
      break;
    }
  }
  let summa = 0;
  obj.forEach(function(item,i,ar){
    summa = summa + item[currentRow];
  })
  return summa;
}

exports.analiz = function(files, cb){
  console.log(files)
  const data = readXLSX(files);
  utils.serialAsync(data,function(file){
    return fb.addData(file);
  })
    .then(()=>{
      cb(data);
    })
  //fb.addData(`list/${files.}`)
}

exports.getAll = function(cb){
  fb.getData('list')
    .then((data)=>{
      cb(data);
    })
}

exports.getAFile = function(reqBody,cb){
  let path = './../storeFiles/' + reqBody.id;
  cb(path);
}
