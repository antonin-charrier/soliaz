import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthenticationService } from './AuthenticationService';

export class AuthenticatedHttp extends AuthHttp {
    constructor(http: Http, options: RequestOptions, authService: AuthenticationService) {
        super(new AuthConfig({
            tokenName: 'token',
                tokenGetter: (() => authService.user.accessToken),
                globalHeaders: [{'Content-Type':'application/json'}],
            }), http, options
        );
    }
}

export function authenticatedHttpFactory(
    http: Http, 
    options: RequestOptions, 
    authService: AuthenticationService
) {
    return new AuthenticatedHttp(http, options, authService);
}