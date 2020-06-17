import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    showError: boolean;
    errorText: string;
    loader;

    constructor(public authService: AuthService, private router: Router, private loading: LoadingController) {
    }

    async ngOnInit() {
        this.loader = await this.loading.create({
            animated: true,
            spinner: 'crescent',
            message: 'Trying to login ',
            translucent: true,
            showBackdrop: true,
            backdropDismiss: false
        });
        if (localStorage.getItem('token')) {
            this.authService.validateToken().subscribe((response: any) => {
                if (response.status === 200) {
                    this.router.navigate(['/nav/home']);
                }
            });
        }
    }

    login(userIdentifier, password) {
        this.showLoading();
        this.showError = false;
        this.authService.login(userIdentifier, password)
            .subscribe((data: any) => {
                this.hideLoading();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                this.router.navigate(['/nav/home']);
            }, error => {
                this.hideLoading();
                this.showError = true;
                if (error.status === 0) {
                    this.errorText = 'There is some issue in Network Connection. Unable to Login';
                } else if (error.status === 401) {
                    this.errorText = 'Username/Password combination not found. Unable to Login';
                } else if (error.status === 400) {
                    this.errorText = 'Enter Username/Password';
                }
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

    dismissToast() {
        this.showError = false;
    }

    async showLoading() {
        console.log('ShowLoading Called');
        await this.loader.present();
    }

    async hideLoading() {
        console.log('HideLoadingCalled');
        await this.loader.dismiss();
    }

}
