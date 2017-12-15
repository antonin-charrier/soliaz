import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService, NotificationService } from 'services';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService } from 'app/services/PostSocketService';
import { Router } from '@angular/router';
import * as Notifications from 'angular2-notifications';
import { NotificationType } from "models"

/**
 * Main component. Display the channel list, the social feed and the notification bar for logged users.
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];
    
    constructor(
        private notificationService: NotificationService,        
        private channelService: ChannelService,
        private postSocketService: PostSocketService,
        private route: ActivatedRoute,
        private router: Router,
        private _service: Notifications.NotificationsService
    ) {
        notificationService.callback = this.refreshNotifications.bind(this);
    }

    async ngOnInit() { 
        this.channels = await this.channelService.getAll();
        this.postSocketService.onNewChannel(this.onNewChannel.bind(this));  
        this.router.navigate(['/channel/' + this.channels[0].id]);                         
    }

    private onNewChannel(channel: Channel) {
        this.channels.push(channel);
    }

    private refreshNotifications() {
        const notifications = this.notificationService.notifications;
        const notif = notifications[notifications.length-1]

        let title = "";
        let message = "";

        switch(notif.type) {
            case NotificationType.CHANNEL:
                title = "Nouveau salon";
                message = notif.username + " a créé un nouveau salon"
            break;
            case NotificationType.COMMENT:
                title = "Nouveau Commentaire";
                message = notif.username + " a commenté un poste"
            break;
            case NotificationType.LIKE:
                title = "Nouveau like";
                message = notif.username + " a aimé un poste"
            break;
            case NotificationType.POST:
                title = "Nouveau poste";
                message = notif.username + " a poster un truc...on sait pas trop quoi"
            break;
            case NotificationType.USER:
                title = "Nouveau salon";
                message = notif.username + " s'est connecté ! Tout le monde dit \"Bienvenu " + notif.username + "\" !!! :D"
            break;
            default:
                title = "Erreur";
                message = "Ah bah ça c'était pas sensé arrivé :o"
            break;
        }
        this._service.success(title, message, { timeOut: 2000,})
    }
}
