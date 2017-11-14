import { injectable } from "inversify";

let socketServer: SocketIO.Server;

export function setSocketServer(socket: SocketIO.Server) {
    socketServer = socket;
    socket.on("connection", (clientSocket) => {
        console.log(`New connection ${clientSocket.id}`);
    });
}

@injectable()
export class SocketService {

    on(event: string, listener: (data) => void) {
        socketServer.on(event, listener);
    }

    emit(event: string, ...data: any[]) {
        socketServer.emit(event, data); 
    }
}
