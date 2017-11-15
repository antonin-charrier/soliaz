import { Component, Input } from '@angular/core';
import { Post, PicturePostContent, BuiltMessage } from 'models';
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
    regex = new RegExp(
        "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
       ,"g"
     );
    picturePostContent = new PicturePostContent("");
    messageArray: BuiltMessage[];
    urlArray = [];
    
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
        this.urlArray = this.post.message.match(this.regex);
        if(this.urlArray)
            this.splitMessage(this.post.message, this.urlArray, 0);
        else
            this.messageArray.push({type: "text", text: this.post.message.trim()});
    }

    splitMessage(message: string, urlArray: string[], idx: number) : string[] {
        const splittedMessage = message.split(urlArray[idx]);
        if(splittedMessage[0].trim() !== "") this.messageArray.push({type: "text", text: splittedMessage[0].trim()});
        if(urlArray[idx].trim() !== "") this.messageArray.push({type: "picture", picture: new PicturePostContent(urlArray[idx].trim())});
        if(splittedMessage[1].split(urlArray[idx +1]).length > 1) {
            this.splitMessage(splittedMessage[1], urlArray, idx+1);
        } else {
            if(splittedMessage[1].trim() !== "") this.messageArray.push({type: "text", text: splittedMessage[1].trim()});            
        }
        return splittedMessage;
    }

    /**
     * Send the new post message to the server
     * @param message message to send
     */
    onComment(message: string) {
    }

    toggleLike() {
        this.postService.like(this.post).then((response) => {
            console.log(response);
            this.post.liked = true;
        }, (error) => {
            console.error(error);
        });
    }
}
