import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  login(username, password) {
    return this.http.post(`${environment.baseUrl}/users/login`, {username, password});
  }

  loginWithGoogle() {
    return this.http.get(`${environment.baseUrl}/users/google`);
  }

  loginWithFacebook() {
    return this.http.get(`${environment.baseUrl}/users/facebook`);
  }
}
