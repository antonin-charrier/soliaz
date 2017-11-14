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
const _ = require("lodash");
let ChannelService = class ChannelService {
    constructor(db, userStore, socketService) {
        this.db = db;
        this.userStore = userStore;
        this.socketService = socketService;
    }
    create(newChannel) {
        const channel = new graph_1.Channel();
        channel.name = newChannel.name;
        return this.db.createVertex(channel).then(c => {
            this.socketService.emit("channel:add", channel);
            return c;
        });
    }
    find(id) {
        return this.db.first(`match (c:Channel {id: {id}}) return c`, { id })
            .then(r => r && r.c ? new graph_1.Channel(r.c) : null);
    }
    findAll() {
        return this.db.query(`match (c:Channel) return c`)
            .then(results => results.map(r => r.c));
    }
    getPosts(id, userId) {
        return this.db.query(`
            match (c:Channel {id: {id}})-[]-(p:Post)
            match (issuer:User)-[:USER_POST]-(p)
            optional match (uLike:User {id: {userId}})-[l:LIKE*0..1]-(p)
            with  p, issuer, c, case when l is not null then true else false end as liked
            optional match (p)-[:POST_COMMENT]-(comment:Post)-[:USER_COMMENT]-(commenter:User)
            return p, issuer, c, liked,
                case when comment is not null then collect({post: comment, issuer: commenter}) else [] end as comments
            order by p.creationTime desc
        `, { id, userId })
            .then(res => res.map(r => {
            r.p.user = {
                id: r.issuer.id,
                username: r.issuer.username,
                pictureUrl: r.issuer.pictureUrl || ""
            };
            r.p.channel = r.c;
            r.p.liked = r.liked;
            r.p.comments = r.comments.map(c => {
                c.post.user = {
                    id: c.issuer.id,
                    username: c.issuer.username,
                    pictureUrl: c.issuer.pictureUrl || ""
                };
                c.post.channel = r.c;
                return c.post;
            });
            r.p.comments = _.orderBy(r.p.comments, c => c.creationTime);
            return r.p;
        }));
    }
    addPost(id, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new graph_1.Post();
            post.message = newPost.message;
            const user = yield this.userStore.find(newPost.userId);
            const channel = yield this.find(id);
            if (!user) {
                throw new Error("Unknown user");
            }
            if (!channel) {
                throw new Error("Unknown channel");
            }
            return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                yield db.createVertex(post);
                const userPost = new graph_1.UserPostEdge(user, post);
                const channelPost = new graph_1.ChannelPostEdge(channel, post);
                yield db.createEdge(userPost);
                yield db.createEdge(channelPost);
                return post;
            })).then(p => {
                let post = p;
                post.user = {
                    id: user.id,
                    username: user.username,
                    pictureUrl: user.pictureUrl
                };
                post.channel = channel;
                post.liked = false;
                post.comments = [];
                this.socketService.emit("post:add", post);
                return p;
            });
        });
    }
};
ChannelService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __param(1, inversify_1.inject(constants_1.TYPES.UserStore)),
    __param(2, inversify_1.inject(constants_1.TYPES.SocketService)),
    __metadata("design:paramtypes", [Object, index_1.UserStore,
        index_1.SocketService])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=ChannelService.js.map