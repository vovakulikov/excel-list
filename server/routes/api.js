const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var multer = require("multer");
var XLSX = require('xlsx');
var xlsxj = require("xlsx-to-json");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/storeFiles/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname)
  }
})

var upload = multer({ storage: storage })
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
function readXLSX(files){
  files.forEach((item,i,ar)=>{
    console.log(item);

  var workbook = XLSX.readFile(item.path);
  console.log(workbook.SheetNames)
  //console.log(workbook)

  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];

  let xlsx_json = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  let sum = getSumOnRow(xlsx_json);
  console.log(sum)
 // let jx = XLSX.utils.sheet_to_json(workbook)
  //console.log(jx)


    console.log('*-----------------------*')
  })
}

router.post("/upload",
  upload.array("uploads", 12), function(req, res) {
  //console.log(req.files)
  res.send(req.files);

  readXLSX(req.files)
});
/* GET api listing. */
router.get('/', (req, res)=>{
  res.end('api works')
});

module.exports = router;
