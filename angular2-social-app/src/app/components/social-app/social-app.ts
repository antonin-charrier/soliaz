import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';
import { ActivatedRoute } from '@angular/router';

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
        private channelService: ChannelService,
        private route: ActivatedRoute
    ) {
    }

    async ngOnInit() { 
        // get the channels with the channelService
    }
}
