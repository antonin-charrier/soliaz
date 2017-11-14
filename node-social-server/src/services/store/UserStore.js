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
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
const graph_1 = require("../../database/graph");
let UserStore = class UserStore {
    constructor(db) {
        this.db = db;
    }
    create(username, passwordHash, email, pictureUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !passwordHash) {
                throw new Error("username and passwordHash must be provided");
            }
            const exists = yield this.exists(username);
            if (exists) {
                throw new Error("User already exists");
            }
            let user = new graph_1.User();
            user.username = username.trim().toLowerCase();
            user.email = email || `${user.username}@itinetwork.com`;
            user.passwordHash = passwordHash;
            user.enabled = true;
            user.pictureUrl = pictureUrl || "";
            return this.db.createVertex(user);
        });
    }
    find(id) {
        return this.db.first(`match (u:User {id: {id}}) return u`, { id })
            .then(r => r && r.u ? new graph_1.User(r.u) : null);
    }
    findByName(username) {
        return this.db.first(`match (u:User {username: {username}}) return u`, { username })
            .then(r => r && r.u ? new graph_1.User(r.u) : null);
    }
    exists(username) {
        return this.db.first(`match (u:User) where u.username = {username} return u`, { username })
            .then(r => r && r.u ? true : false);
    }
    update(user) {
        return this.db.updateVertex(user);
    }
};
UserStore = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __metadata("design:paramtypes", [Object])
], UserStore);
exports.UserStore = UserStore;
//# sourceMappingURL=UserStore.js.map