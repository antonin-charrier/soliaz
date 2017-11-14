import "reflect-metadata";
import { Controller, Post, Get } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES }  from "../constants";
import { AuthenticationService, UserStore } from "../services";


@injectable()
@Controller("/api/authentication")
export class AuthenticationController {

    constructor(
        @inject(TYPES.AuthenticationService) private authService: AuthenticationService,
        @inject(TYPES.UserStore) private userStore: UserStore
    ) {
    }

    @Post("/login")
    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        let result = await this.authService.authenticate(req.body.username, req.body.password);
        return result;
    }

    @Post("/register")
    public async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        let user = await this.authService.register(req.body);
        return user;
    }

    @Get("/exists")
    public async exists(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userStore
            .exists(req.query.username)
            .then(exists => { return {exists}; });
    }
}