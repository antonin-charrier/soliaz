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
        if(splittedMessage[0].trim() !== "") {
            this.messageArray.push({type: "text", text: splittedMessage[0].trim()});
        }
        if(urlArray[idx].trim() !== "" && (/\.(gif|jpg|jpeg|tiff|png)$/i).test(urlArray[idx].trim())) {
            this.messageArray.push({type: "picture", picture: new PicturePostContent(urlArray[idx].trim())});
        } else if(urlArray[idx].trim() !== "" && (/\.(avi|mov|mp4|webm|ogg|wav)$/i).test(urlArray[idx].trim())) {
            this.messageArray.push({type: "video", video: new VideoPostContent(urlArray[idx].trim())});            
        } else if (urlArray[idx].trim() !== "" && (/(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi).test(urlArray[idx].trim())) {
            let video_id = urlArray[idx].trim().split('v=')[1];
            let ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
              video_id = video_id.substring(0, ampersandPosition);
            }
            this.messageArray.push({type: "youtube", youtube: new YoutubePostContent(video_id)});                        
        }
        if(urlArray.length>idx+1 && splittedMessage[1].split(urlArray[idx +1].trim()).length > 1) {
            this.splitMessage(splittedMessage[1], urlArray, idx+1);
        } else {
            if(splittedMessage[1].trim() !== "") this.messageArray.push({type: "text", text: splittedMessage[1].trim()});            
        }
        return splittedMessage;
    }

    toggleLike() {
        this.postService.like(this.post).then((response) => {
            this.post.liked = true;
        }, (error) => {
            console.error(error);
        });
    }
}
