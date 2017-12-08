import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { PostService, MessageParser } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';

/**
 * Wrap user inputs like textarea
 */
@Component({
    selector: 'user-inputs',
    templateUrl: 'user-inputs.html'
})
export class UserInputsComponent {

    @Input() channelId: string;
    @Input() post: Post;
    message: string;

    @Output()
    submitted: EventEmitter<any> = new EventEmitter();

    constructor(
        private postService: PostService
    ) {
    }

    send() {
        if (!this.message) return;
        let promise: any;

        if (this.post) {
            this.postService.comment(this.post, this.message);
        } else {
            this.postService.post(this.channelId, this.message);
            const socialAppFeed = document.getElementById('main-div');
            socialAppFeed.scrollTop = 0;
        }
    }
}
