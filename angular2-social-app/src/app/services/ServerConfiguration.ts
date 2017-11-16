import { Injectable } from "@angular/core";

@Injectable()
export class ServerConfiguration {
    host = 'localhost';
    port = 3001;
    uriScheme = 'http';
    url: string;

    constructor(options: { host?: string, port?: number, uriScheme?: string } = {}) {
        this.host = options.host || this.host;
        this.port = options.port || this.port;
        this.uriScheme = options.uriScheme || this.uriScheme;

        this.url = `${this.uriScheme}://${this.host}`;
        if (this.port != 80) {
            this.url += `:${this.port}`;
        }
    };
}
