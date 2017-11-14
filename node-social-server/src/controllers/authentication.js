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
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
const services_1 = require("../services");
let AuthenticationController = class AuthenticationController {
    constructor(authService, userStore) {
        this.authService = authService;
        this.userStore = userStore;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.authService.authenticate(req.body.username, req.body.password);
            return result;
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.authService.register(req.body);
            return user;
        });
    }
    exists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userStore
                .exists(req.query.username)
                .then(exists => { return { exists }; });
        });
    }
};
__decorate([
    inversify_express_utils_1.Post("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    inversify_express_utils_1.Post("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    inversify_express_utils_1.Get("/exists"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "exists", null);
AuthenticationController = __decorate([
    inversify_1.injectable(),
    inversify_express_utils_1.Controller("/api/authentication"),
    __param(0, inversify_1.inject(constants_1.TYPES.AuthenticationService)),
    __param(1, inversify_1.inject(constants_1.TYPES.UserStore)),
    __metadata("design:paramtypes", [services_1.AuthenticationService,
        services_1.UserStore])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.js.map