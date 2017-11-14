"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const inversify_1 = require("inversify");
let socketServer;
function setSocketServer(socket) {
    socketServer = socket;
    socket.on("connection", (clientSocket) => {
        console.log(`New connection ${clientSocket.id}`);
    });
}
exports.setSocketServer = setSocketServer;
let SocketService = class SocketService {
    on(event, listener) {
        socketServer.on(event, listener);
    }
    emit(event, ...data) {
        socketServer.emit(event, data);
    }
};
SocketService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=SocketService.js.map