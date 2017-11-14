import { Get, Controller } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IGraphDb } from "../services";
import { TYPES } from "../constants";
import { authorize } from "../utils";

@injectable()
@Controller("/")
export class HomeController {
    constructor( @inject(TYPES.IGraphDb) private _db: IGraphDb) {

    }

    @Get("/")
    public get(req: Request, res: Response, next: NextFunction): any {
        return `Hello world`;
    }

    @Get("/protected", authorize())
    public getProtecetedResource(req: Request, res: Response, next: NextFunction): any {
        return `Your are authorized !`;
    }
}
