/**
 * Created by Vova on 21.03.2017.
 */;

let Exel = require('../models/excel.js');
let path = require('path');

exports.analiz = function(req,res){
  Exel.analiz(req.files,function(data) {
    res.send(data)
  });
}

exports.get = function (req,res){
  Exel.getAll(function (data) {
    res.send(data);
  });
}

exports.download = function (req, res){
  console.log('Запрос на скачивания файла с id ',req.params.id);
  Exel.getAFile(req.params,function (p) {
    console.log(path.resolve(__dirname + p))

    res.download(path.resolve(__dirname + p));

  })
}
