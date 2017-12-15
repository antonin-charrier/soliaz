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
var inversify_express_utils_1 = require('inversify-express-utils');
var inversify_1 = require('inversify');
var FeedService_1 = require('../service/impl/FeedService');
var SocketService_1 = require('../service/SocketService');
var types_1 = require('../constant/types');
var FeedController = (function () {
    function FeedController(_feedSerivce, _socket, _db) {
        this._feedSerivce = _feedSerivce;
        this._socket = _socket;
        this._db = _db;
    }
    FeedController.prototype.post = function (request) {
        return this._feedSerivce.post(request.body);
    };
    FeedController.prototype.getFeeds = function (request) {
        return this._db.find("feed", {});
    };
    FeedController.prototype.like = function (request) {
        console.log("like");
        return this._feedSerivce.like(request.params.id, request.body);
    };
    FeedController.prototype.comment = function (request) {
        return this._feedSerivce.comment(request.params.id, request.body);
    };
    __decorate([
        inversify_express_utils_1.Post("/"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FeedController.prototype, "post", null);
    __decorate([
        inversify_express_utils_1.Get("/"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FeedController.prototype, "getFeeds", null);
    __decorate([
        inversify_express_utils_1.Post("/:id/like"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FeedController.prototype, "like", null);
    __decorate([
        inversify_express_utils_1.Post("/:id/comment"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FeedController.prototype, "comment", null);
    FeedController = __decorate([
        inversify_1.injectable(),
        inversify_express_utils_1.Controller('/feed'),
        __param(0, inversify_1.inject(types_1.default.FeedService)),
        __param(1, inversify_1.inject(types_1.default.SocketService)),
        __param(2, inversify_1.inject(types_1.default.IDBClient)), 
        __metadata('design:paramtypes', [FeedService_1.FeedService, SocketService_1.SocketService, Object])
    ], FeedController);
    return FeedController;
}());
exports.FeedController = FeedController;
//# sourceMappingURL=feed.js.map