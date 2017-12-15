import { Component, OnInit, Input } from '@angular/core';
import { NotificationType, Notification } from 'models';
import { Router } from '@angular/router';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    @Input() notifications: Notification[] = [];

    
    notificationType = NotificationType;

    constructor(
        private router: Router,        
    ) { }

    ngOnInit() { }

    clickNotif(e:MouseEvent, notification:Notification) {
        switch(notification.type) {
            case NotificationType.CHANNEL:
                this.router.navigate(['/channel/' + notification.channel.id]);                         
                break;
            case NotificationType.POST:
                this.router.navigate(['/channel/' + notification.post.channel.id]);
                break;
             case NotificationType.LIKE:
                this.router.navigate(['/channel/' + notification.like.post.channel.id]);
                break;
            case NotificationType.COMMENT:
                this.router.navigate(['/channel/' + notification.comment.post.channel.id]);
                break;
        }
    }

    clearNotif() {
        this.notifications = [];
        localStorage.removeItem("notifications");
    }
}
