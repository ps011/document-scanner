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
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.authService.validateToken().subscribe((response: any) => {
        if (response.status === 200) {
            this.router.navigate(['/nav/home']);
        }
      });
  }

  login(userIdentifier, password) {
    this.showLoading = true;
    this.authService.login(userIdentifier, password)
        .subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/nav/home']);
        }, error => {
            console.log(error);
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
}
