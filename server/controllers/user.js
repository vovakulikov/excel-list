const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const User = new UserModel();

exports.getProfile = function (req,res) {
  res.json({user: req.user});
}
exports.registerUser = function(req, res) {
  console.log('Наша модель',UserModel)
  let fuckingUser = new UserModel({
    username: req.body.username,
    password: req.body.password
  })
  console.log('Тело зарпоса на регистрацию',req.body)
  fuckingUser.register(function (err,user) {
      if(err){
        res.json({succsess: false, msg: 'Гребаныый юзер не заргался'})
      }
      else{
        res.json({succsess: true, msg: 'user registered', user: user})
      }
  });
}

exports.authUser = function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  //console.log('DLKFJKLDJFkl',UserModel)
  console.log('Auth',username,password)

  User.getUserByUsername(username)
    .then((user) => {
        if(!user){
          res.json({succsess: false, msg: "User not found"});
          return;
        }
      User.comparePassword(password, user.password, function(isMatch){
        if (isMatch){
          const token = jwt.sign(user, 'secret', {
            expiresIn: 604800
          });
          res.json({succsess: true,
            token:'JWT '+token,
            user: user
          });
        } else{
          return res.json({succsess: false, msg: "User password is not compare"});
        }
      })
    })



  /*User.getUserByUsername(username, function(err,user){
    if(err) throw err;
    if(!user){
      console.log('Вернем ошибку')
      res.json({succsess: false, msg: "User not found"});
      return;
    }
    console.log('Это наш ющер из файрбай',user)
    User.comparePassword(password, user.password, function(isMatch){
      if (isMatch){
        const token = jwt.sign(user, 'secret', {
          expiresIn: 604800
        });
        res.json({succsess: true,
                  token:'JWT'+token,
                  user: user
                });
      } else{
        return res.json({succsess: false, msg: "User password is not compare"});
      }
    })
  })*/
}
