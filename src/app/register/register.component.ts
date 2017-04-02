import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:string;
  lastName:string;
  email:string;
  password:string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit(event){
    event.preventDefault();
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    console.log(user);


    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if(data.succsess){
        this.router.navigate(['/login'])
      }
      else{
        console.log('Something goes wrong :(');
      }
    })
  }
}
