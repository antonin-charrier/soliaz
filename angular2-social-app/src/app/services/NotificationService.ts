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
            username: post.user.username
        })
        this.store();
    }

    addCommentNotification(comment: Comment): void {
        this.notifications.push({
            type: NotificationType.COMMENT,
            username: comment.user.username
        })
        this.store();
    }

    addLikeNotification(like: Like): void {
        this.notifications.push({
            type: NotificationType.LIKE,
            username: like.user.username
        })
        this.store();
    }

    addChannelNotification(channel: Channel): void {
        this.notifications.push({
            type: NotificationType.CHANNEL
        })
        this.store();
    }

    addUserNotification(user: User): void {
        this.notifications.push({
            type: NotificationType.USER,
            username: user.username
        })
        this.store();
    }

    store(): void {
        localStorage.setItem("notifications", JSON.stringify(this.notifications));
    }
}