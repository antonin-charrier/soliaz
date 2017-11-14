import Promise = require("bluebird");
import config from "./config/env/index";
import { configureExpress, configureErrors } from "./config/express";
import kernel from "./config/kernel";
import configureAuth from "./config/authentication";
import configureServices from "./config/services";
import passport = require("passport");
import { Neo4jConnection } from "./utils/connection";
import { InversifyExpressServer} from "inversify-express-utils";
import Socket = require("socket.io");
import { SocketService, setSocketServer } from "./services"; 

const debug = require("debug")("up-up:index");

Neo4jConnection.connect(config.neo4j);


// configure services and DI
configureServices(kernel, passport);
// configure OAuth bearer authentication
configureAuth(passport);

// start the server
let server = new InversifyExpressServer( kernel );
server.setConfig(configureExpress);
server.setErrorConfig(configureErrors);
let app = server.build();
let httpServer = require("http").Server(app);
let io = Socket(httpServer);
setSocketServer(io);

// listen on port config.port
httpServer.listen(config.port, () => {
	console.log(`server started on port ${config.port} (${config.env})`);
});

export default app;