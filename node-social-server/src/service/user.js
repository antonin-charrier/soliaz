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
var types_1 = require('../constant/types');
var UserService = (function () {
    function UserService(db) {
        this._db = db;
    }
    UserService.prototype.getUsers = function () {
        return this._db.find('user', {});
    };
    UserService.prototype.getUser = function (id) {
        return this._db.findOneById('user', id);
    };
    UserService.prototype.getUserByName = function (userName) {
        return this._db.find('user', { userName: userName }).then(function (u) { return u.length ? u[0] : null; });
    };
    UserService.prototype.newUser = function (user) {
        return this._db.insert('user', user);
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return this._db.findOneById('user', user._id).then(function (dbUser) {
            dbUser.pictureUrl = user.pictureUrl;
            dbUser.userName = user.userName;
            return _this._db.update('user', user._id, dbUser);
        });
    };
    UserService.prototype.deleteUser = function (user) {
        return this._db.remove('user', user._id);
    };
    UserService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.IDBClient)), 
        __metadata('design:paramtypes', [Object])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.js.map