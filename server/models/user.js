const fb = require('../db.js');
const path = require('path');


function getUserByUsername(email){
  return  fb.getUserByUsername(email)
}

exports.register = function register(user){
  return getUserByUsername(user.email)
    .then(() => {
      throw new Error('Пользователь с таким именем уже есть в базе');
    },() => {
      return fb.addUser(user);
    })
}

exports.getUserByUsername = getUserByUsername;

exports.comparePassword = function (passReq, user){
  return new Promise((resolve) => {
    if(passReq == user.password){
      resolve(user);
    } else{
      throw new Error('Неверный пароль')
    }
  })
};

exports.getPassToPassport = function(email, cb){
  getUserByUsername(email)
    .then((user)=>{
      cb(false,user);
    })
};

exports.getFile = function(req){
  let currentPath = './../storeFiles/registered/'+req.user.email+'/'+req.params.id;
  currentPath = path.join(__dirname, currentPath);

  return path.resolve(currentPath);
};
