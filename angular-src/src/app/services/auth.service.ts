import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/users/register', user, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/users/authenticate', user, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8081/users/profile', {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const authToken = localStorage.getItem('id_token')
    if(authToken != undefined && authToken != null)
      return true;
    else
      return false;
  }

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
