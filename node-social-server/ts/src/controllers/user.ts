import { Get, Controller, Put } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IGraphDb } from "../services";
import { TYPES } from "../constants";
import { authorize } from "../utils";

@injectable()
@Controller("/user", authorize())
export class UserController {
    constructor( @inject(TYPES.IGraphDb) private _db: IGraphDb) {

    }

    @Get("/")
    public getAll(req: Request, res: Response, next: NextFunction): any {
        return `Hello world`;
    }

    @Get("/:id")
    public get(req: Request, res: Response, next: NextFunction): any {
        return `Hello world`;
    }

    @Put("/")
    public editProfile(req: Request, res: Response, next: NextFunction): any {
        return `Your are authorized !`;
    }
}
