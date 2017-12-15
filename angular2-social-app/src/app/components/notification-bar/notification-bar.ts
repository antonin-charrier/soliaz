import { Component, OnInit, Input } from '@angular/core';
import { NotificationType } from 'models';


@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    @Input() notifications: Notification[] = [];

    
    notificationType = NotificationType;

    constructor() { }

    ngOnInit() { }

    clickNotif() {

    }

    clearNotif() {
        this.notifications = [];
        localStorage.removeItem("notifications");
    }
}
