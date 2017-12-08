import { Component, Input } from '@angular/core';
import { Comment, BuiltMessage } from 'models';
import { MessageParser } from 'app/services/MessageParser';

/**
 * Display a post comment
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;

    messageArray: BuiltMessage[];

    constructor(
        private parser: MessageParser
    ) {}
    
    ngOnInit() {
        this.messageArray = [];
        this.comment.content = this.parser.parse(this.comment);
        this.messageArray = this.parser.buildMessage(this.comment.message);
    }
}