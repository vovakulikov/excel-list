import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../shared/validate.service';
import { AuthService } from './../shared/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('Форма отрисовалась ')
  }

  onSubmit(event){
    event.preventDefault();
    console.log('Форма была отправлена',event);
    console.log('Данные пользователя при логине ', this.email,' ',this.password)

    const user = {
      email: this.email,
      password: this.password
    }

    console.log(user)
  //  console.log(this.validateService.validateLogin(user));


    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data)

      if(data.succsess){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['profile'])
      }
    })
  }

}
