import { Get, Post, Controller } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IGraphDb } from "../services";
import { TYPES } from "../constants";
import { authorize, validateBody } from "../utils";
import { ChannelService, PostService } from "../services";
import { NewPost } from "../models/request";

@injectable()
@Controller("/api/post", authorize())
export class PostController {
    constructor(
        @inject(TYPES.IGraphDb) private _db: IGraphDb,
        @inject(TYPES.PostService) private postService: PostService
    ) {
    }

    @Post("/:id/like")
    public like(req: Request, res: Response, next: NextFunction): any {
        return this.postService.like(req.params.id, req.user.id);
    }

    @Post("/:id/comment", validateBody(NewPost))
    public comment(req: Request, res: Response, next: NextFunction): any {
        let newComment = req.body;
        newComment.userId = req.user.id;

        return this.postService.comment(req.params.id, newComment);
    }
}
