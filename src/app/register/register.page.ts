import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    showLoading: boolean;
    showError: boolean;
    errorText: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(name, username, email, password, mobile) {
    this.showLoading = true;
    this.authService.register(name, username, email, password, mobile)
        .subscribe((data: any) => {
          if (data._id &&  data.name && data.username) {
            this.authService.login(data.email, data.password)
                .subscribe((login: any) => {
                  localStorage.setItem('token', login.token);
                  this.router.navigate(['/home']);
                });
          }
        }, error => {
            this.showError = true;
            if (error.status === 0) {
                this.errorText = 'There is some issue in Network Connection. Unable to Register';
            } else if (error.status === 401) {
                this.errorText = 'Username/Password combination not found. Unable to Login';
            } else if (error.status === 400) {
                this.errorText = 'Enter Username/Password';
            }
        });
    this.showLoading = false;
  }

  registerWithGoogle() {
    this.authService.loginWithGoogle()
        .subscribe(data => {
          console.log(data);
        });
  }

  registerWithFacebook() {
    this.authService.loginWithFacebook()
        .subscribe(data => {
          console.log(data);
        });
  }


    dismissToast() {
        this.showError = false;
    }

}
