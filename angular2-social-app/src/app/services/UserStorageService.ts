import { Injectable } from '@angular/core';
import { AuthenticatedUser } from 'models';

@Injectable()
export class UserStorageService {
    itemKey = "$user";

    constructor() { }

    read(): AuthenticatedUser {
        let serializeduser = localStorage.getItem(this.itemKey);
        if( serializeduser ) {
            return JSON.parse(serializeduser);
        }

        return null;
    }

    write(user: AuthenticatedUser) {
        localStorage.setItem(this.itemKey, JSON.stringify(user));
    }

    clean() {
        localStorage.removeItem(this.itemKey);
    }
}
