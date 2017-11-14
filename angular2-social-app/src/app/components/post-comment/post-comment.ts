import { Component, Input } from '@angular/core';
import { Comment } from 'models';

/**
 * Display a post comment
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
}