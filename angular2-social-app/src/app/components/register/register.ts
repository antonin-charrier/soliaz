import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration, RegistrationErrors } from 'models';
import { NgForm } from '@angular/forms';
import { fail } from 'assert';

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
    errors: RegistrationErrors = {};   
    loading = false; 

    constructor(
        private registrationService: RegistrationService,
        private router: Router,
    ) { }

    register() {
        this.errors = {};
        const controls = this.ngForm.form.controls;
        if (this.ngForm.form.invalid) {
            this.errors.missingUserName = controls.username.errors.required;
            this.errors.missingPassword = controls.password.errors.required;
            this.errors.validUserName = controls.username.errors.pattern !== undefined;
            this.errors.validPassword = controls.password.errors.pattern !== undefined;
            return;
        }
        
        // register user with registrationService
        this.model = {
            username: controls.username.value.toLowerCase(),
            password: controls.password.value,
            pictureUrl: controls.pictureUrl.value
        }

        this.loading = true;
        this.registrationService.usernameExists(this.model.username).then((response) => {
            //User does exist
            if(!response) {
                //User does not exist
                this.registrationService.register(this.model).then((response) => {
                    this.loading = false;
                    this.router.navigate(['/login']);          
                }, (error) => {
                    this.loading = false;
                });
            } else { 
                this.errors.takenUserName = true; 
                this.loading = false;
            }
        }, (error) => {
            this.loading = false;
        });
    }
}
