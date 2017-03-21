/**
 * Created by Vova on 21.03.2017.
 */

var Exel = require('../Models/excels');


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
