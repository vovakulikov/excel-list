import { Component, OnInit } from '@angular/core';
// todo: use one type of quotes
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from '../shared/flash-messages.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css', '../shared/css/controlls.css']
})

export class RegisterComponent{
  firstName;
  lastName;
  email;
  password;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessages: FlashMessagesService) { }

  onSubmit(event) {
    event.preventDefault();

    // todo: it's time to read about interfaces
    // todo: https://www.typescriptlang.org/docs/handbook/interfaces.html
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe(response => {
      if (response.success) {
        this.flashMessages.addMessege({
          message: 'Now you are registered, please authorization ',
          type: 'success'
        });
        this.router.navigate(['/login']);
      } else {
        //Здесь будет выводится сообщение об ошибке в flash message
        console.log('Something goes wrong :(');
        console.log(response);
      }
    });
  }
}
