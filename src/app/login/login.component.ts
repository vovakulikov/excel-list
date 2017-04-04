import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from "@angular/router"
import { FlashMessagesService } from '../shared/flash-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private FlashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(event){
    event.preventDefault();
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data)
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['profile']);
        this.FlashMessage.removeMessage();
      } else{
        console.log('We have a error and now we will update flash messege')
        this.FlashMessage.addMessege(data.msg);
      }
    })

  }

}
