import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent,
    BuiltMessage
}
    from '../models';



const youtube = "https://youtu.be/";

/**
 * Parse post content
 */
export class MessageParser {

    private messageArray: BuiltMessage[];
    private urlRegex = new RegExp(
        "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
       ,"g"
     );

    
    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);

        if (pictureMatche) {
            // return picture content
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        // return YoutubeContent if match


        const videoRegex = / /gmi; // TODO
        // return VideoContent if match


        return null;
    }

    buildMessage(message: string) : BuiltMessage[] {
        this.messageArray = [];
        let urlArray = message.match(this.urlRegex); 
        if(urlArray)        
            this.splitMessage(message, urlArray, 0);
        else
            this.messageArray.push({type: "text", text: message.trim()});
        return this.messageArray;
    }

    private splitMessage(message: string, urlArray: string[], idx: number) : string[] {
        const splittedMessage = message.split(urlArray[idx]);
        if(splittedMessage[0].trim() !== "") {
            this.messageArray.push({type: "text", text: splittedMessage[0].trim()});
        }
        if(urlArray[idx].trim() !== "") { 
            if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(urlArray[idx].trim())) {
                this.messageArray.push({type: "picture", picture: new PicturePostContent(urlArray[idx].trim())});
            } else if((/\.(avi|mov|mp4|webm|ogg|wav)$/i).test(urlArray[idx].trim())) {
                this.messageArray.push({type: "video", video: new VideoPostContent(urlArray[idx].trim())});            
            } else if ((/(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi).test(urlArray[idx].trim())) {
                let video_id = urlArray[idx].trim().split('v=')[1];
                let ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }
                this.messageArray.push({type: "youtube", youtube: new YoutubePostContent(video_id)});                        
            } else {
                this.messageArray.push({type: "link", link: urlArray[idx].trim()});                            
            }
        }
        if(urlArray.length>idx+1 && splittedMessage[1].split(urlArray[idx +1].trim()).length > 1) {
            this.splitMessage(splittedMessage[1], urlArray, idx+1);
        } else {
            if(splittedMessage[1].trim() !== "") this.messageArray.push({type: "text", text: splittedMessage[1].trim()});            
        }
        return splittedMessage;
    }
}
