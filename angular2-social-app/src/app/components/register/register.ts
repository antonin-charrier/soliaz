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
        if (this.ngForm.form.invalid) {
            return;
        }
        
        // register user with registrationService
    }
}
