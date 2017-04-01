const fb = require('../db.js');

class User {
  constructor(){}

  register(user){
    return fb.getUserByUsername_2(user.username)
      .then(() => {
        throw new Error('Пользователь с таким именем уже есть в базе');
      },() => {
        return fb.addUser_3(user);
      })
  }

  getUserByUsername(username){
    return  fb.getUserByUsername_2(username)
  }

  comparePassword_2(passReq, user){
    return new Promise((resolve) => {
      if(passReq == user.password){
        resolve(user);
      } else{
        throw new Error('Неверный пароль')
      }
    })
  }

  getPassToPassport(username, cb){
    this.getUserByUsername(username)
      .then((user)=>{
            cb(false,user);
      })
  }
}

module.exports = new User();



