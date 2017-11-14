import { Get, Post, Controller } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IGraphDb } from "../services";
import { TYPES } from "../constants";
import { authorize, validateBody } from "../utils";
import { ChannelService } from "../services";
import { NewChannel, NewPost } from "../models/request";

@injectable()
@Controller("/api/channel", authorize())
export class ChannelController {
    constructor( 
        @inject(TYPES.IGraphDb) private _db: IGraphDb,
        @inject(TYPES.ChannelService) private channelService: ChannelService
    ) {
    }

    @Get("/")
    public getAll(req: Request, res: Response, next: NextFunction): any {
        return this.channelService.findAll();
    }

    @Get("/:id/post")
    public getPosts(req: Request, res: Response, next: NextFunction): any {
        return this.channelService.getPosts(req.params.id, req.user.id);
    }

    @Post("/", validateBody(NewChannel))
    public create(req: Request, res: Response, next: NextFunction): any {
        return this.channelService.create(req.body);
    }

    @Post("/:id/post", validateBody(NewPost))
    public addPost(req: Request, res: Response, next: NextFunction): any {
        let newPost = req.body;
        newPost.userId = req.user.id;

        return this.channelService.addPost(req.params.id, newPost);
    }
}
