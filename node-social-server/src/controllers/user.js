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
let UserController = class UserController {
    constructor(_db) {
        this._db = _db;
    }
    getAll(req, res, next) {
        return `Hello world`;
    }
    get(req, res, next) {
        return `Hello world`;
    }
    editProfile(req, res, next) {
        return `Your are authorized !`;
    }
};
__decorate([
    inversify_express_utils_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getAll", null);
__decorate([
    inversify_express_utils_1.Get("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], UserController.prototype, "get", null);
__decorate([
    inversify_express_utils_1.Put("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], UserController.prototype, "editProfile", null);
UserController = __decorate([
    inversify_1.injectable(),
    inversify_express_utils_1.Controller("/user", utils_1.authorize()),
    __param(0, inversify_1.inject(constants_1.TYPES.IGraphDb)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.js.map