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
const constants_1 = require("../constants");
const graph_1 = require("../database/graph");
const index_1 = require("./index");
let PostService = class PostService {
    constructor(db, userStore, socketService) {
        this.db = db;
        this.userStore = userStore;
        this.socketService = socketService;
    }
    find(id) {
        return this.db.first(`match (p:Post {id: {id}}) return p`, { id })
            .then(r => r && r.p ? new graph_1.Post(r.p) : null);
    }
    like(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userStore.find(userId);
            const post = yield this.find(id);
            const like = yield this.db.first(`match (:Post {id: {postId}})-[l:LIKE]-(:User {id: {userId}}) return l`, { postId: id, userId }).then(r => r && r.l ? r.l : null);
            if (!user) {
                throw new Error("User not exists");
            }
            if (!post) {
                throw new Error("User not exists");
            }
            if (like) {
                return Promise.resolve(like);
            }
            const likeEdge = new graph_1.LikeEdge(user, post);
            return this.db.createEdge(likeEdge)
                .then(e => {
                this.socketService.emit("post:like", {
                    creationTime: likeEdge.creationTime,
                    post,
                    user
                });
                return e;
            });
        });
    }
    comment(id, newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userStore.find(newComment.userId);
            const post = yield this.find(id);
            const comment = new graph_1.Post();
            comment.message = newComment.message;
            if (!user) {
                throw new Error("User not exists");
            }
            if (!post) {
                throw new Error("User not exists");
            }
            return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                yield db.createVertex(comment);
                const userComment = new graph_1.UserCommentEdge(user, comment);
                const postComment = new graph_1.PostCommentEdge(comment, post);
                yield db.createEdge(userComment);
                yield db.createEdge(postComment);
                return comment;
            })).then(e => {
                let c = comment;
                c.post = post;
                c.user = {
                    id: user.id,
                    username: user.username,
                    pictureUrl: user.pictureUrl || ""
                };
                this.socketService.emit("post:comment", c);
                return e;
            });
        });
    }
};
PostService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __param(1, inversify_1.inject(constants_1.TYPES.UserStore)),
    __param(2, inversify_1.inject(constants_1.TYPES.SocketService)),
    __metadata("design:paramtypes", [Object, index_1.UserStore,
        index_1.SocketService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map