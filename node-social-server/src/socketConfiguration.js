"use strict";
var socket;
function configure(ioServ, kernel) {
    socket = ioServ;
    socket.on("connection", (s) => {
        console.log(`New connection ${s.id}`);
    });
}
exports.configure = configure;
function getSocket() {
    return socket;
}
exports.getSocket = getSocket;
//# sourceMappingURL=socketConfiguration.js.map