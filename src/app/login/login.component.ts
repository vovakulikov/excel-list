import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from "@angular/router"
import { FlashMessagesService } from '../shared/flash-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../shared/css/controlls.css']
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
  }
  ngOnInit(){
    console.log('init login')
  }

  ngOnDestroy(){
    console.log('Login destroy')
  }

  onSubmit(event){
    event.preventDefault();
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {

      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['profile']);
        this.FlashMessage.removeMessage();
      } else {
        this.FlashMessage.addMessege({
          message: data.msg,
          type: 'alert'
        });
      }
    })

  }

}
