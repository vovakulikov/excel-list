import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Форма отрисовалась ')
  }

  onSubmit(event){
    event.preventDefault();
    console.log('Форма была отправлена',event);
  }

}
