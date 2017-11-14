import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfiguration } from './ServerConfiguration';
import { UserStorageService } from './UserStorageService';
import { AuthenticatedUser, UserLogin, AuthenticationResult } from 'models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    user: AuthenticatedUser;
    get isAuthenticated() {
        return !!this.user;
    }

    constructor(
        private http: Http,
        private config: ServerConfiguration,
        private userStore: UserStorageService,
        private router: Router
    ) {
        this.user = userStore.read();
    }

    authenticate(user: UserLogin): Promise<AuthenticatedUser> {
        return this.http
            .post(`${this.config.url}/api/authentication/login`, user)
            .map(r => r.json())
            .map((result: AuthenticationResult) => {
                if (result.succeeded) {
                    this.userStore.write(result.user);
                    this.user = result.user;
                    return result.user;
                } else {
                    throw result;
                }
            })
            .toPromise();
    }

    logout() {
        this.userStore.clean();
        this.router.navigate(['/login']);
    }
}
