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
var user_1 = require('../service/user');
var types_1 = require('../constant/types');
var UserController = (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.getUsers = function () {
        return this.userService.getUsers();
    };
    UserController.prototype.findUser = function (request, response) {
        return this.userService.getUserByName(request.params.userName).then(function (user) {
            if (!user) {
                response.sendStatus(404);
                return null;
            }
            return user;
        });
    };
    UserController.prototype.getUser = function (request, response) {
        return this.userService.getUser(request.params.id).then(function (user) {
            if (!user) {
                response.sendStatus(404);
                return null;
            }
            return user;
        });
    };
    UserController.prototype.newUser = function (request) {
        return this.userService.newUser(request.body);
    };
    UserController.prototype.updateUser = function (request) {
        var user = request.body;
        user._id = request.params.id;
        return this.userService.updateUser(user);
    };
    UserController.prototype.deleteUser = function (request) {
        return this.userService.deleteUser(request.params.id);
    };
    __decorate([
        inversify_express_utils_1.Get('/'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "getUsers", null);
    __decorate([
        inversify_express_utils_1.Get('/find/:userName'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "findUser", null);
    __decorate([
        inversify_express_utils_1.Get('/:id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "getUser", null);
    __decorate([
        inversify_express_utils_1.Post('/'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "newUser", null);
    __decorate([
        inversify_express_utils_1.Put('/:id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "updateUser", null);
    __decorate([
        inversify_express_utils_1.Delete('/:id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Promise)
    ], UserController.prototype, "deleteUser", null);
    UserController = __decorate([
        inversify_1.injectable(),
        inversify_express_utils_1.Controller('/user'),
        __param(0, inversify_1.inject(types_1.default.UserService)), 
        __metadata('design:paramtypes', [user_1.UserService])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.js.map