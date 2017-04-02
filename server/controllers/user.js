const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var dir = './server/storeFiles/registered';

exports.getDocs = function (req,res) {
  res.json({user: req.user, dosc: {
    document:" this will be dated a docs"
  }});
}

exports.getProfile = function (req,res) {
  console.log(req)
  console.log('Наш юзер',req.user);

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
      res.json({succsess: true, msg: 'user registered', user: user})
    })
    .catch((error) => {
      res.json({succsess: false, msg: error.message})
    })
}

exports.authUser = function(req,res){

  const email = req.body.email;
  const password = req.body.password;

  UserModel.getUserByUsername(email)
    .then((user)=>{
      return UserModel.comparePassword_2(password, user);
    })
    .then((user) => {
      const token = jwt.sign(user, 'secret', {
        expiresIn: 604800
      });
      res.json({succsess: true,
        token:'JWT '+token,
        user: user
      });
    })
    .catch((error) => {
      console.log('This is from catch block ', error)
      res.json({succsess: false,anotherField:'sdfsd', msg: error.message});
    })
}
