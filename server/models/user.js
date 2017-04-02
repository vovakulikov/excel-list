const fb = require('../db.js');

class User {
  constructor(){}

  register(user){
    return fb.getUserByUsername_2(user.email)
      .then(() => {
        throw new Error('Пользователь с таким именем уже есть в базе');
      },() => {
        return fb.addUser_3(user);
      })
  }

  getUserByUsername(email){
    return  fb.getUserByUsername_2(email)
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

  getPassToPassport(email, cb){
    this.getUserByUsername(email)
      .then((user)=>{
            cb(false,user);
      })
  }
}

module.exports = new User();



