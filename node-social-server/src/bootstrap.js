"use strict";
require('reflect-metadata');
var inversify_express_utils_1 = require('inversify-express-utils');
var inversify_1 = require('inversify');
var inversify_logger_middleware_1 = require('inversify-logger-middleware');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var types_1 = require('./constant/types');
var tags_1 = require('./constant/tags');
var home_1 = require('./controller/home');
var MongoDBClient_1 = require('./service/impl/MongoDBClient');
var user_1 = require('./controller/user');
var feed_1 = require('./controller/feed');
var FeedService_1 = require('./service/impl/FeedService');
var user_2 = require('./service/user');
var SocketService_1 = require('./service/SocketService');
var socket_1 = require('./socket');
var Socket = require('socket.io');
var connection_1 = require('./utils/mongodb/connection');
var cors = require('cors');
// load everything needed to the kernel
var kernel = new inversify_1.Kernel();
var port = 3999;
if (process.env.NODE_ENV === 'development') {
    var logger = inversify_logger_middleware_1.makeLoggerMiddleware();
    kernel.applyMiddleware(logger);
}
kernel.bind(inversify_express_utils_1.TYPE.Controller).to(home_1.HomeController).whenTargetNamed(tags_1.default.HomeController);
kernel.bind(inversify_express_utils_1.TYPE.Controller).to(user_1.UserController).whenTargetNamed(tags_1.default.UserController);
kernel.bind(inversify_express_utils_1.TYPE.Controller).to(feed_1.FeedController).whenTargetNamed(tags_1.default.FeedController);
kernel.bind(types_1.default.IDBClient).to(MongoDBClient_1.MongoDBClient);
kernel.bind(types_1.default.UserService).to(user_2.UserService);
kernel.bind(types_1.default.FeedService).to(FeedService_1.FeedService);
kernel.bind(types_1.default.SocketService).to(SocketService_1.SocketService);
// start the server
var server = new inversify_express_utils_1.InversifyExpressServer(kernel);
server.setConfig(function (app) {
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
});
connection_1.MongoDBConnection.connect(function (error, db) {
    if (error) {
        console.error("DB connection ERROR ", error);
    }
    else {
        console.log("DB connected");
    }
});
var app = server.build();
var httpServer = require('http').Server(app);
var io = Socket(httpServer);
socket_1.configure(io);
httpServer.listen(port);
console.log("Server started on port " + port + " =)");
exports = module.exports = app;
//# sourceMappingURL=bootstrap.js.map