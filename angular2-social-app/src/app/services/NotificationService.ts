import { PostSocketService, PostService } from 'services';
import { Injectable } from '@angular/core';
import { 
    Notification,
    NotificationType,
    Post,
    Like,
    Comment,
    Channel,
    User
 } from "models"

@Injectable()
export class NotificationService {

    public notifications: Notification[];
    private callbackFunction: () => void;

    public constructor(
        private postSocket: PostSocketService,
    ){
        this.notifications = JSON.parse(localStorage.getItem("notifications"));
        if (!this.notifications) this.notifications = [];
        postSocket.onPost(this.addPostNotification.bind(this));
        postSocket.onComment(this.addCommentNotification.bind(this));
        postSocket.onLike(this.addLikeNotification.bind(this));
        postSocket.onNewChannel(this.addChannelNotification.bind(this));
        postSocket.onUserConnect(this.addUserNotification.bind(this));
    }

    set callback(callback) {
        this.callbackFunction = callback;
    }

    addPostNotification(post: Post): void {
        this.notifications.push({
            type: NotificationType.POST,
            username: post.user.username,
            post
        })
        this.store();
        this.callbackFunction();
    }

    addCommentNotification(comment: Comment): void {
        this.notifications.push({
            type: NotificationType.COMMENT,
            username: comment.user.username,
            comment
        })
        this.store();
        this.callbackFunction();
    }

    addLikeNotification(like: Like): void {
        this.notifications.push({
            type: NotificationType.LIKE,
            username: like.user.username,
            like
        })
        this.store();
        this.callbackFunction();
    }

    addChannelNotification(channel: Channel): void {
        this.notifications.push({
            type: NotificationType.CHANNEL,
            channel
        })
        this.store();
        this.callbackFunction();
    }

    addUserNotification(user: User): void {
        this.notifications.push({
            type: NotificationType.USER,
            username: user.username,
            user
        })
        this.store();
        this.callbackFunction();
    }

    store(): void {
        localStorage.setItem("notifications", JSON.stringify(this.notifications));
    }
}