import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfiguration } from './ServerConfiguration';
import { UserRegistration } from 'models';

@Injectable()
export class RegistrationService {

    constructor(
        private http: Http,
        private config: ServerConfiguration
    ) {
    }

    register(newUser: UserRegistration): Promise<any> {
        return this.http
            .post(`${this.config.url}/api/authentication/register`, newUser)
            .map(resp => resp.json())
            .toPromise();
    }

    usernameExists(username: string): Promise<boolean> {
        return this.http
            .get(`${this.config.url}/api/authentication/exists?username=${username}`)
            .map(resp => resp.json())
            .map(res => res.exists)
            .toPromise();
    }
}