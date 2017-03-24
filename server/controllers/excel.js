/**
 * Created by Vova on 21.03.2017.
 */;

 let Exel = require('../models/excel.js')
 let path = require('path')

 exports.analiz = function (req, res) {
   Exel.analiz(req.files, function (data) {
     res.send(data)
   })
 }

 exports.get = function (req, res) {
   Exel.getAll(function (data) {
     res.send(data)
   })
 }

 exports.download = function (req, res) {
   Exel.getAFile(req.params, function (p) {
     const currentPath = path.join(__dirname, p)
     res.download(path.resolve(currentPath))
   })
 }
