import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from "@angular/router"
import { FlashMessagesService } from '../shared/flash-messages.service';
import { getAnimationConfig } from '../router.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [getAnimationConfig()],
  styleUrls: ['./login.component.css','../shared/css/controlls.css'],
  host: {
    '[@openClose]': 'true',
    'style': 'display: block;'
  }
})
export class LoginComponent{

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private FlashMessage: FlashMessagesService) {

    if(this.authService.loggedIn()){
      this.router.navigate([''])
    }

  };

  onSubmit(event){
    event.preventDefault();
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(responce => {

      if(responce.success){
        this.authService.storeUserData(responce.token, responce.user);
        this.router.navigate(['profile']);
        this.FlashMessage.removeMessage();
      } else {
        this.FlashMessage.addMessege({
          message: responce.msg,
          type: 'alert'
        });
      }
    })

  }

}
