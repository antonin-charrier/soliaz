"use strict";
var socket;
function configure(ioServ) {
    socket = ioServ;
    socket.on("connection", function (s) {
        console.log("New connection " + s.id);
    });
}
exports.configure = configure;
function getSocket() {
    return socket;
}
exports.getSocket = getSocket;
//# sourceMappingURL=socket.js.map