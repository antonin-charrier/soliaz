import { interfaces, Controller, TYPE } from "inversify-express-utils";
import { 
    HomeController,
    ChannelController,
    PostController,
    AuthenticationController 
} from "../controllers";
import { 
    IGraphDb,
    NeoGraphDb,
    IDocumentDb,
    AuthenticationService,
    ChannelService,
    PostService,
    SocketService
} from "../services";
import { UserStore } from "../services/store";
import { Kernel } from "inversify";
import { Passport } from "passport";
import configureAuth from "./authentication";
import { TYPES } from "../constants";
import logger from "./winston";
import { LoggerInstance } from "winston";
import config from "./env";

export default function configureServices(kernel: Kernel, passport: Passport) {
    kernel.bind<LoggerInstance>( TYPES.LoggerInstance ).toConstantValue(logger);
    kernel.bind<IGraphDb>( TYPES.IGraphDb ).toConstantValue(new NeoGraphDb(config.neo4j));
    kernel.bind<Passport>( TYPES.Passport ).toConstantValue(passport);
    kernel.bind<AuthenticationService>( TYPES.AuthenticationService ).to(AuthenticationService).inSingletonScope();
    kernel.bind<UserStore>( TYPES.UserStore ).to(UserStore).inSingletonScope();
    kernel.bind<ChannelService>( TYPES.ChannelService ).to(ChannelService).inSingletonScope();
    kernel.bind<PostService>( TYPES.PostService ).to(PostService).inSingletonScope();
    kernel.bind<SocketService>( TYPES.SocketService ).to(SocketService).inTransientScope();
    
    // controllers
    kernel.bind<interfaces.Controller>( TYPE.Controller ).to( ChannelController ).whenTargetNamed("ChannelController");
    kernel.bind<interfaces.Controller>( TYPE.Controller ).to( PostController ).whenTargetNamed("PostController");
    
    kernel.bind<interfaces.Controller>( TYPE.Controller ).to( HomeController ).whenTargetNamed("HomeController");
    kernel.bind<interfaces.Controller>( TYPE.Controller ).to( AuthenticationController ).whenTargetNamed("AuthenticationController");

    return kernel;
}
