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
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const services_1 = require("../services");
const request_1 = require("../models/request");
let ChannelController = class ChannelController {
    constructor(_db, channelService) {
        this._db = _db;
        this.channelService = channelService;
    }
    getAll(req, res, next) {
        return this.channelService.findAll();
    }
    getPosts(req, res, next) {
        return this.channelService.getPosts(req.params.id, req.user.id);
    }
    create(req, res, next) {
        return this.channelService.create(req.body);
    }
    addPost(req, res, next) {
        let newPost = req.body;
        newPost.userId = req.user.id;
        return this.channelService.addPost(req.params.id, newPost);
    }
};
__decorate([
    inversify_express_utils_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], ChannelController.prototype, "getAll", null);
__decorate([
    inversify_express_utils_1.Get("/:id/post"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], ChannelController.prototype, "getPosts", null);
__decorate([
    inversify_express_utils_1.Post("/", utils_1.validateBody(request_1.NewChannel)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], ChannelController.prototype, "create", null);
__decorate([
    inversify_express_utils_1.Post("/:id/post", utils_1.validateBody(request_1.NewPost)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], ChannelController.prototype, "addPost", null);
ChannelController = __decorate([
    inversify_1.injectable(),
    inversify_express_utils_1.Controller("/api/channel", utils_1.authorize()),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __param(1, inversify_1.inject(constants_1.TYPES.ChannelService)),
    __metadata("design:paramtypes", [Object, services_1.ChannelService])
], ChannelController);
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.js.map