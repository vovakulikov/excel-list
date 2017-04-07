import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../shared/interfaces/user';

@Injectable()
export class AuthService {
  authToken: string;
  user: User;

  constructor(private http: Http,
              private router: Router) { }

  registerUser(user:User) {
    let headers = new Headers();

    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user:User){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/auth', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user:User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;


    localStorage.clear();
    this.router.navigate(['']);
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
