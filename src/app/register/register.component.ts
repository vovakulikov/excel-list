import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from '../shared/flash-messages.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css','../shared/css/controlls.css']
})

export class RegisterComponent{
  firstName:string;
  lastName:string;
  email:string;
  password:string;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService) { }

  onSubmit(event){
    event.preventDefault();

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe(response => {
      if(response.success){
        this.flashMessages.addMessege({
          message: 'Now you are registered, please authorization ',
          type:'success'
        });
        this.router.navigate(['/login'])
      } else{
        //Здесь будет выводится сообщение об ошибке в flash message
        console.log('Something goes wrong :(');
        console.log(response)
      }
    })

  }
}
