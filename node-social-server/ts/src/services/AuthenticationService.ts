import jwt = require("jsonwebtoken");
import config from "../config/env/index";
import {injectable, inject} from "inversify";
import { Request, Response, NextFunction } from "express";
import { UserClaims } from "../models";
import { NewUser } from "../models/request";
import { User } from "../database/graph";
import { TYPES } from "../constants";
import { UserStore } from "./store";
import crypto = require("crypto");

export interface AuthenticationResult {
    succeeded: boolean;
    accessToken?: string;
    user?: any;
}

@injectable()
export class AuthenticationService {
    static TOKEN_LIFETIME = 1000 * 3600 * 24 * 7; // one week

    constructor(
        @inject(TYPES.UserStore) private userStore: UserStore

    ) {}

    createToken(claims: UserClaims): string {
        claims.expirationTime = new Date().getTime() + AuthenticationService.TOKEN_LIFETIME;
        return jwt.sign(claims, config.jwtSecret);
    }

    hashPassword(password: string): string {
        return crypto
            .createHash("sha1")
            .update(password)
            .digest("hex");
    }

    async authenticate(username: string, password: string): Promise<AuthenticationResult> {
        let user = await this.userStore.findByName(username);
        const passwordHash = this.hashPassword(password);

        if (user && username === user.username && passwordHash === user.passwordHash) {
            const accessToken = this.createToken({
                id: user.id,
                username: user.username,
                expirationTime: new Date().getTime() + AuthenticationService.TOKEN_LIFETIME
            });
            user.accessToken = accessToken;
            await this.userStore.update(user);
            delete user.passwordHash;
            
            return {
                succeeded: true,
                accessToken,
                user
            };
        }

        return { succeeded: false };
    }

    async register(newUser: NewUser): Promise<any> {
        const passwordHash = this.hashPassword(newUser.password);
        let user = await this.userStore.create(newUser.username, passwordHash, newUser.email, newUser.pictureUrl);
        delete user.passwordHash;

        return user;
    }
}