"use strict";
const index_1 = require("./config/env/index");
const express_1 = require("./config/express");
const kernel_1 = require("./config/kernel");
const authentication_1 = require("./config/authentication");
const services_1 = require("./config/services");
const passport = require("passport");
const connection_1 = require("./utils/connection");
const inversify_express_utils_1 = require("inversify-express-utils");
const Socket = require("socket.io");
const services_2 = require("./services");
const debug = require("debug")("up-up:index");
connection_1.Neo4jConnection.connect(index_1.default.neo4j);
// configure services and DI
services_1.default(kernel_1.default, passport);
// configure OAuth bearer authentication
authentication_1.default(passport);
// start the server
let server = new inversify_express_utils_1.InversifyExpressServer(kernel_1.default);
server.setConfig(express_1.configureExpress);
server.setErrorConfig(express_1.configureErrors);
let app = server.build();
let httpServer = require("http").Server(app);
let io = Socket(httpServer);
services_2.setSocketServer(io);
// listen on port config.port
httpServer.listen(index_1.default.port, () => {
    console.log(`server started on port ${index_1.default.port} (${index_1.default.env})`);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map