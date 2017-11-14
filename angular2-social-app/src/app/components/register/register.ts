import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';

/**
 * Registration for new user
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private router: Router
    ) { }

    register() {
        debugger;
        if (this.ngForm.form.invalid) {
            return;
        }
        
        // register user with registrationService
        const controls = this.ngForm.form.controls;
        this.model = {
            username: controls.username.value,
            password: controls.password.value,
            pictureUrl: controls.pictureUrl.value
        }
        this.registrationService.register(this.model).then((response) => {
            console.log(response);
        }, (error) => {
            console.error(error);
        });
    }
}
