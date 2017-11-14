import { Injectable, NgZone } from '@angular/core';
import { Post, Like, Comment, Channel, User } from '../models'
import { SocketService } from './SocketService';

/**
 * Websocket events
 */
@Injectable()
export class PostSocketService {
    private socket: SocketService;

    constructor(socket: SocketService, zone:NgZone){
        this.socket = socket;
    }

    onNewChannel(callback: (channel: Channel) => void) {
        this.socket.on("channel:add", callback);
    }

    onUserConnect(callback: (user: User) => void) {
        this.socket.on("user:connect", callback);
    }

    onPost(callback: (post: Post) => void) {
        this.socket.on("post:add", callback);
    }

    onLike(callback: (like: Like) => void) {
        this.socket.on("post:like", callback);
    }

    onComment(callback: (comment: Comment) => void) {
        this.socket.on("post:comment", callback);
    }
}
