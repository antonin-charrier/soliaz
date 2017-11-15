import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';
import { RouterLink } from '@angular/router/src/directives/router_link';

/**
 * Log a user
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent  {
    model = new UserLogin();
    failed = false;
    loading = false;

    constructor(
            private authService: AuthenticationService,
            private router : Router
    ) { }

    login() {
        this.failed = false;
        // use authService to authenticate and router to redirect

        this.loading = true;
        this.authService.authenticate(this.model).then((response) => {
            this.loading = false;
            this.router.navigate(['/']);                      
        }, (error) => {
            this.loading = false;            
            this.failed = true;
        });
    }
}
