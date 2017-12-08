import { Component, Input } from '@angular/core';
import { Post, PicturePostContent, BuiltMessage, VideoPostContent, YoutubePostContent } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Display a user post with comments and like 
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;

    date: Date;
    messageArray: BuiltMessage[];
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.messageArray = [];
        this.post.content = this.parser.parse(this.post);
        this.date = new Date(this.post.creationTime);
        this.messageArray = this.parser.buildMessage(this.post.message);
    }

    toggleLike() {
        this.postService.like(this.post).then((response) => {
            this.post.liked = true;
        }, (error) => {
            console.error(error);
        });
    }
}
