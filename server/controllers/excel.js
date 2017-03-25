/**
 * Created by Vova on 21.03.2017.
 */
  //todo: Exel - typo?
  //solution: rename Exel to ExelFileModel
 const ExelFileModel = require('../models/excel.js');
 const path = require('path');

 //todo: rename analiz to analyze
 //solution: rename analiz method of ExelFileModel to parseFile
 exports.saveFiles = function (req, res) {
   ExelFileModel.parseFile(req.files)
     .then((data)=>{
       res.send(data)
     })
     .catch((rejectFile) => {
       console.log(rejectFile);
       res.status(500).send('При отправке файлов произошла ошибка!');
     })
 };

 exports.getAll = function (req, res) {
   ExelFileModel.getAll(function (data) {
     res.send(data)
   })
 };

 exports.download = function (req, res) {
   let currentPath =  ExelFileModel.getAFile(req.params);

   res.download(currentPath);

 };
