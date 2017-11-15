import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/index';
import { ModalDirective } from 'ngx-bootstrap';
import { ChannelService } from 'services';

/**
 * Add a new channel in the list
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(ModalDirective)
    modal: ModalDirective;
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = { name: '' };

    constructor(
        private authService: AuthenticationService,        
        private channelService: ChannelService
    ) {
    }

    save() {
        if (this.ngForm.valid) {
            // this.modal.hide() to close de dialog
        }
    }

    logout() {
        this.authService.logout();
    }
}