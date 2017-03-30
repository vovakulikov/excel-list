/**
 * Created by Vova on 21.03.2017.
 */
 const ExelFileModel = require('../models/excel.js');

 exports.saveFiles = function (req, res) {
   ExelFileModel.parseFile(req.files)
     .then((data) => {
       res.send(data);
     }).catch (() => {
       res.status(500).send('При отправке файлов произошла ошибка!');
     });
 };

 exports.getAll = function (req, res) {
   ExelFileModel.getAll(function (data) {
     res.send(data);
   });
 };

 exports.download = function (req, res) {
   const currentPath =  ExelFileModel.getAFile(req.params);

   res.download(currentPath);

 };
