import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService, NotificationService } from 'services';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService } from 'app/services/PostSocketService';
import { Router } from '@angular/router';
import * as Notifications from 'angular2-notifications';

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
        
    }
}
