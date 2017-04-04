const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dir = './server/storeFiles/registered';
const excelModel = require('../models/excel.js');
const utils = require('../utils.js');
const fb = require('../db.js');


exports.download = function (req, res){
  const currentPath = UserModel.getFile(req);

  res.download(currentPath);
};

exports.uploadFile = function(req,res){
  const dataAboutFiles = excelModel.parsingFiles(req.files);

  utils.serialAsync(dataAboutFiles, function (file) {
    return fb.addDocumentsToUser(req.user, file);
  })
    .then(() => {
      res.send({data : dataAboutFiles});
    }).catch (() => {
      res.status(500).send('При отправке файлов произошла ошибка!');
    });

};

exports.getDocs = function (req,res) {
    fb.getData('/users/'+utils.hash(req.user.email)+'/documents/')
      .then(data => {
         res.json(data);
      })
      .catch(() => {
        res.json({
          success: false,
          msg: 'При получение файлов произошла ошибка'
        });
      })
};

exports.getProfile = function (req,res) {
  res.json({user: req.user});
}


exports.registerUser = function(req, res) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  UserModel.register(user)
    .then(() => {
      fs.mkdirSync(dir+`/${user.email}`);
      res.json({success: true, msg: 'user registered', user: user})
    })
    .catch((error) => {
      res.json({success: false, msg: error.message})
    })
}

exports.authUser = function(req,res){

  const email = req.body.email;
  const password = req.body.password;

  UserModel.getUserByUsername(email)
    .then((user)=>{
      return UserModel.comparePassword(password, user);
    })
    .then((user) => {
      const token = jwt.sign(user, 'secret', {
        expiresIn: 604800
      });
      res.json({success: true,
        token:'JWT '+token,
        user: user
      });
    })
    .catch((error) => {
      res.json({success: false,anotherField:'sdfsd', msg: error.message});
    })
}

