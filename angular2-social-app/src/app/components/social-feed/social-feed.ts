import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent } from 'models';

/**
 * 
 */
@Component({
  selector: 'social-feed', 
  templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit { 
    items: Post[] = [];
    channelId: string;

    constructor(
        private postService: PostService, 
        private postSocket: PostSocketService,
        private route: ActivatedRoute
    ) {}

    onSubmit(message: string) {
       
    }

    ngOnInit() {
        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
                this.postService
                    .getAll(this.channelId)
                    .then((items) => {
                        this.items = items
                        items.sort((a, b) => {
                            return a.creationTime - b.creationTime;
                        })
                    });
            } );

        this.postSocket.onPost(this.onPost.bind(this));
        this.postSocket.onComment(this.onComment.bind(this));
    }

    private onPost(post: Post) {
        this.items.push(post);
    }

    onComment(comment) {
        for (const post of this.items) {
            if(comment.post.id === post.id) {
                post.comments.push(comment)
            }
        }
    }
}
