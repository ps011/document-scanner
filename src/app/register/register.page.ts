import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(name, username, email, password, mobile) {
    this.authService.register(name, username, email, password, mobile)
        .subscribe((data: any) => {
          console.log(data);
          if (data._id &&  data.name && data.username) {
            this.authService.login(data.email, data.password)
                .subscribe((login: any) => {
                  localStorage.setItem('token', login.token);
                  this.router.navigate(['/home']);
                });
          }
        });
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

}
