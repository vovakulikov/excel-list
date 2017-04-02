import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateLogin(user){
    Object.keys(user).forEach((key) => {
      if(!user[key]) return false;
    })
    return true;
  }

  validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
}
