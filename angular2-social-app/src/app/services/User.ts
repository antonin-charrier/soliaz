import {Injectable} from '@angular/core';
import {User} from '../models';

@Injectable()
export class LoggedUser extends User {
    static Deserialize( data: string ) {
        var obj = JSON.parse(data);
        
        return Object.assign(new User(), obj);
    }
}