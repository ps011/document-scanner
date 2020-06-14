import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.authService.validateToken().subscribe((response: any) => {
        if (response.status === 200) {
            this.router.navigate(['/home']);
        }
      });
  }

  login(userIdentifier, password) {
    this.authService.login(userIdentifier, password)
        .subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        });
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
