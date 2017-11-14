export class UserLogin {
    userName: string;
    password: string;
}

export interface AuthenticationResult {
    succeeded: boolean;
    accessToken?: string;
    user?: AuthenticatedUser;
}

export class UserRegistration {
    username: string;
    password: string;
    email?: string;
    pictureUrl?: string;
}

export class User {
    id: string;
    username: string;
    pictureUrl: string;
}

export class AuthenticatedUser {
    id: string;
    username: string;
    accessToken: string;
    pictureUrl: string;
}
export interface Channel {
    id: string;
    name: string;
}
export class Post {
    id: string;
    user: User;
    channel: Channel;
    creationTime: number;
    liked: boolean;
    message: string;
    content?: PostContent<any>;
    comments: Comment[];
}

export class Comment extends Post {
    post?: Post;
}

export class Like  {
    user: User;
    creationTime: number;
    id: string;
    post: Post;
}

export abstract class PostContent<T> {
    type:string;
    value: T;

    constructor();
    constructor(type:string, content: T);
    constructor(type?:string, content?: T){
        this.type = type;
        this.value = content;
    }
}

export type MediaContent = {
    mediaUrl: string,
}

export type YoutubeContent = {
    videoId: string,
}

export class VideoPostContent extends PostContent<MediaContent>{
    constructor(videoUrl:string) {
        super('video', {
            mediaUrl: videoUrl
        });
    }
}

export class PicturePostContent extends PostContent<MediaContent>{
    constructor(pictureUrl:string) {
        super('picture', {
            mediaUrl: pictureUrl
        });
    }
}

export class YoutubePostContent extends PostContent<YoutubeContent>{
    constructor(videoId:string) {
        super('youtube', {
            videoId: videoId
        });
    }
}
