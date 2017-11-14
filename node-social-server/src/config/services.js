"use strict";
const inversify_express_utils_1 = require("inversify-express-utils");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const store_1 = require("../services/store");
const constants_1 = require("../constants");
const winston_1 = require("./winston");
const env_1 = require("./env");
function configureServices(kernel, passport) {
    kernel.bind(constants_1.TYPES.LoggerInstance).toConstantValue(winston_1.default);
    kernel.bind(constants_1.TYPES.IGraphDb).toConstantValue(new services_1.NeoGraphDb(env_1.default.neo4j));
    kernel.bind(constants_1.TYPES.Passport).toConstantValue(passport);
    kernel.bind(constants_1.TYPES.AuthenticationService).to(services_1.AuthenticationService).inSingletonScope();
    kernel.bind(constants_1.TYPES.UserStore).to(store_1.UserStore).inSingletonScope();
    kernel.bind(constants_1.TYPES.ChannelService).to(services_1.ChannelService).inSingletonScope();
    kernel.bind(constants_1.TYPES.PostService).to(services_1.PostService).inSingletonScope();
    kernel.bind(constants_1.TYPES.SocketService).to(services_1.SocketService).inTransientScope();
    // controllers
    kernel.bind(inversify_express_utils_1.TYPE.Controller).to(controllers_1.ChannelController).whenTargetNamed("ChannelController");
    kernel.bind(inversify_express_utils_1.TYPE.Controller).to(controllers_1.PostController).whenTargetNamed("PostController");
    kernel.bind(inversify_express_utils_1.TYPE.Controller).to(controllers_1.HomeController).whenTargetNamed("HomeController");
    kernel.bind(inversify_express_utils_1.TYPE.Controller).to(controllers_1.AuthenticationController).whenTargetNamed("AuthenticationController");
    return kernel;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureServices;
//# sourceMappingURL=services.js.map