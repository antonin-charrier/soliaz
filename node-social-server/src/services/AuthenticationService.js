"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const jwt = require("jsonwebtoken");
const index_1 = require("../config/env/index");
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
const store_1 = require("./store");
const crypto = require("crypto");
let AuthenticationService = AuthenticationService_1 = class AuthenticationService {
    constructor(userStore) {
        this.userStore = userStore;
    }
    createToken(claims) {
        claims.expirationTime = new Date().getTime() + AuthenticationService_1.TOKEN_LIFETIME;
        return jwt.sign(claims, index_1.default.jwtSecret);
    }
    hashPassword(password) {
        return crypto
            .createHash("sha1")
            .update(password)
            .digest("hex");
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userStore.findByName(username);
            const passwordHash = this.hashPassword(password);
            if (user && username === user.username && passwordHash === user.passwordHash) {
                const accessToken = this.createToken({
                    id: user.id,
                    username: user.username,
                    expirationTime: new Date().getTime() + AuthenticationService_1.TOKEN_LIFETIME
                });
                user.accessToken = accessToken;
                yield this.userStore.update(user);
                delete user.passwordHash;
                return {
                    succeeded: true,
                    accessToken,
                    user
                };
            }
            return { succeeded: false };
        });
    }
    register(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = this.hashPassword(newUser.password);
            let user = yield this.userStore.create(newUser.username, passwordHash, newUser.email, newUser.pictureUrl);
            delete user.passwordHash;
            return user;
        });
    }
};
AuthenticationService.TOKEN_LIFETIME = 1000 * 3600 * 24 * 7; // one week
AuthenticationService = AuthenticationService_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.UserStore)),
    __metadata("design:paramtypes", [store_1.UserStore])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var AuthenticationService_1;
//# sourceMappingURL=AuthenticationService.js.map