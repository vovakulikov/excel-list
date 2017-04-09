  const UserModel = require('../models/user.js');
  const jwt = require('jsonwebtoken');
  const fs = require('fs');
  const dir = './server/storeFiles/registered';
  const excelModel = require('../models/excel.js');
  const utils = require('../utils/util-promise.js');
  const hash = require('../utils/util-hash.js');
  const fb = require('../db.js');
  const liveDocumentStore = require('../liveStore.js');

  exports.download = function (req, res){
    const currentPath = UserModel.getFile(req);

    res.download(currentPath);
  };

  exports.subcribe = function (req, res) {
    liveDocumentStore.subcribe(req, res);
  }

  exports.uploadFile = function(req,res){
    const dataAboutFiles = excelModel.parsingFiles(req.files);

    utils.serialAsync(dataAboutFiles, function (file) {
      return fb.addDocumentsToUser(req.user, file);
    }).then(() => {
        //console.log('success branch ', documentInfo);
        liveDocumentStore.publish(req, {documentInfo : dataAboutFiles})
        //res.send({documentInfo : dataAboutFiles});
        res.json({success: true})
      }).catch ((err) => {
      res.status(500).send(err.message);
    });

  };

  exports.getDocs = function (req,res) {
    fb.getDocuments('/users/' + hash(req.user.email) + '/documents/')
      .then(documents => {
        res.json(documents);
      })
      .catch((err) => {
        res.json({
          success: false,
          msg: err.message
        });
      });
  };

  exports.getProfile = function (req,res) {
    res.json({email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName});
  };


  exports.registerUser = function(req, res) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    UserModel.register(user)
      .then(() => {
        if(!fs.existsSync(dir + `/${user.email}`)){
          fs.mkdirSync(dir + `/${user.email}`);
        }
        res.json({success: true, msg: 'user registered', user: user});
      })
      .catch((error) => {
        res.json({success: false, msg: error.message});
      });
  };

  exports.authUser = function(req,res){

    const email = req.body.email;
    const password = req.body.password;

    UserModel.getUserByUsername(email)
      .then((user)=>{
        return UserModel.comparePassword(password, user);
      })
      .then((user) => {
        const token = jwt.sign({email: user.email}, 'secret', {
          expiresIn: 604800
        });

        res.json({success: true,
          token:'JWT '+ token,
          user: user.email
        });
      })
      .catch((error) => {
        res.json({success: false,anotherField:'sdfsd', msg: error.message});
      });
  };

