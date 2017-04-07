/**
 * Created by Vova on 21.03.2017.
 */
 const ExelFileModel = require('../models/excel.js');

 exports.saveFiles = function (req, res) {
   ExelFileModel.parseFile(req.files)
     .then((data) => {
     // todo: variables should be self-describable, forget about data, obj, a, b, d.
       res.send(data);
     }).catch (() => {
     // todo: You can catch exact error and show it. F.E: .catch(err => res.status(500).send(err.message))
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
