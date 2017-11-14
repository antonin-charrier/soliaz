import { Injectable } from '@angular/core';
import { AuthenticatedHttp } from './AuthenticatedHttp';
import { ServerConfiguration } from './ServerConfiguration';
import { LoggedUser } from './User';
import { Channel } from 'models';

@Injectable()
export class ChannelService {
    
     constructor(
        private http: AuthenticatedHttp, 
        private user: LoggedUser, 
        private config: ServerConfiguration
    ) { }

    getAll(): Promise<Channel[]> {
        return this.http
            .get(`${this.config.url}/api/channel`)
            .map(resp => resp.json())
            .toPromise();
    }

    add(name: string) {
         return this.http
            .post(`${this.config.url}/api/channel`, {name})
            .map(resp => resp.json())
            .toPromise();
    }
}
