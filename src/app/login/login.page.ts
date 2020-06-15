import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    showLoading: boolean;
    showError: boolean;
    errorText: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
      if (localStorage.getItem('token')) {
          this.authService.validateToken().subscribe((response: any) => {
              if (response.status === 200) {
                  this.router.navigate(['/nav/home']);
              }
          });
      }
  }

  login(userIdentifier, password) {
    this.showLoading = true;
    this.authService.login(userIdentifier, password)
        .subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/nav/home']);
        }, error => {
           this.showError = true;
           if (error.status === 0) {
               this.errorText = 'There is some issue in Network Connection. Unable to Login';
           } else if (error.status === 401) {
               this.errorText = 'Username/Password combination not found. Unable to Login';
           } else if (error.status === 400) {
               this.errorText = 'Enter Username/Password';
           }
        });
    this.showLoading = false;
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
        .subscribe(data => {
          console.log(data);
        });
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook()
        .subscribe(data => {
          console.log(data);
        });
  }

  dismissToast() {
    this.showError = false;
  }
}
