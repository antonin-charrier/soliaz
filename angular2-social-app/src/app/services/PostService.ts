import { Injectable } from '@angular/core';
import { AuthenticatedHttp } from './AuthenticatedHttp';
import { ServerConfiguration } from './ServerConfiguration';
import { LoggedUser } from './User';
import { Post, Like } from '../models';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {
    
    constructor(
        private http: AuthenticatedHttp, 
        private user: LoggedUser, 
        private config: ServerConfiguration
    ) { }

    getAll(channelId: string) : Promise<Post[]> {
        return this.http
            .get(`${this.config.url}/api/channel/${channelId}/post`)
            .map(resp => resp.json())
            .toPromise();
    }

    post<T>(channelId: string, message: string): Promise<any> {
        if (!message) {
            throw new Error("The post message cannot be empty!");
        }

        return this.http
            .post(`${this.config.url}/api/channel/${channelId}/post`, {message})
            .map( r => r.json())
            .toPromise();
    }

    like(post: Post): Promise<any> {
        const url = `${this.config.url}/api/post/${post.id}/like`;
        // like the post
    }
    
    comment(post: Post, message: string): Promise<any> {
        post.user = this.user;
        const url = `${this.config.url}/api/post/${post.id}/comment`;
        // post the comment
    }
}
