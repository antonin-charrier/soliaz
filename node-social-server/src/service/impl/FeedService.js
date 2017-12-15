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
var inversify_1 = require('inversify');
var SocketService_1 = require('../SocketService');
var types_1 = require('../../constant/types');
var FeedService = (function () {
    function FeedService(mongoClient, socket) {
        this.socket = socket;
        this._db = mongoClient;
        this._socket = socket;
    }
    FeedService.prototype.post = function (feedItem) {
        var _this = this;
        if (!feedItem.issuer) {
            throw "Issuer is missing";
        }
        feedItem.likes = [];
        feedItem.comments = [];
        feedItem.publishedDate = new Date();
        feedItem.userLikes = {};
        return this._db.insert("feed", feedItem).then(function (r) {
            _this._socket.emit("feed:new", feedItem);
            return feedItem;
        });
    };
    FeedService.prototype.like = function (id, like) {
        var _this = this;
        if (!like.issuer) {
            throw "Issuer is missing";
        }
        return this._db.findOneById("feed", id).then(function (item) {
            if (item) {
                if (item.userLikes[like.issuer._id] == undefined) {
                    item.likes.push(like);
                    item.userLikes[like.issuer._id] = like.issuer;
                    return _this._db.update("feed", id, item);
                }
                throw "Already liked by user " + like.issuer.userName;
            }
            throw "Item not found";
        }).then(function (item) {
            _this._socket.emit("feed:like", item, like);
            return item;
        });
    };
    FeedService.prototype.comment = function (id, comment) {
        var _this = this;
        if (!comment.issuer) {
            throw "Issuer is missing";
        }
        return this._db.findOneById("feed", id).then(function (item) {
            if (item) {
                item.comments.push(comment);
                return _this._db.update("feed", id, item);
            }
            throw "Item not found";
        }).then(function (item) {
            _this._socket.emit("feed:comment", item, comment);
            return item;
        });
    };
    FeedService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.IDBClient)),
        __param(1, inversify_1.inject(types_1.default.SocketService)), 
        __metadata('design:paramtypes', [Object, SocketService_1.SocketService])
    ], FeedService);
    return FeedService;
}());
exports.FeedService = FeedService;
//# sourceMappingURL=FeedService.js.map