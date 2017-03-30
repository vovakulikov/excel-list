const fb = require('../db.js');

class User {
  constructor(user){
   this.user = user;
  }

  register(cb){
    fb.addUser(this.user)
      .then(() => {
        cb(null,this.user);
      }, () => {
        cb("Error",this.user);
      })
  }

  getUserByUsername(username){
    return fb.getUserByUsername(username)
  }

  comparePassword(pass, password, cb){
    console.log('Пароли для сравнения',pass,password);
    if(pass == password){
      cb(true);
    }else{
      cb(false)
    }
  }

  getPassToPassport(username, cb){
    this.getUserByUsername(username)
      .then((user)=>{
            cb(false,user);
      })
  }
}

module.exports = User;



