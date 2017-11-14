import {Injectable, NgZone } from "@angular/core";
import { ServerConfiguration } from './ServerConfiguration';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private url: string;
    private socket: SocketIOClient.Socket;
    private connect: Promise<SocketIOClient.Socket>;
    private zone:NgZone;

    constructor( config: ServerConfiguration, zone:NgZone ){
        this.url = config.url;
        this.zone = zone;
        
        this.socket = io(this.url);
        this.connect = new Promise<SocketIOClient.Socket>((resolve, reject)=>{
            this.socket.on('connect', function(){
                resolve(this.socket);
            });
        }); 

    }

    on(event: string, callback: (...data: any[]) => void){
        this.connect.then( s =>  this.socket.on(event, (data) => {
            this.zone.run( () => callback.apply(this, data) );
        } ));
    }

    emit(event:string, ...args:any[]){
        this.connect.then( s =>  this.socket.emit(event, args) );
    }
}