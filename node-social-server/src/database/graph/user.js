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
const decorators_1 = require("../decorators");
const dbtypes_1 = require("../dbtypes");
let User = class User extends dbtypes_1.Vertex {
};
__decorate([
    decorators_1.Prop({
        readonly: true,
        mandatory: true,
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    decorators_1.Prop({
        indexed: true,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    decorators_1.Prop({
        mandatory: true,
        indexed: true
    }),
    __metadata("design:type", Boolean)
], User.prototype, "enabled", void 0);
__decorate([
    decorators_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "pictureUrl", void 0);
User = __decorate([
    decorators_1.GraphItem("User"),
    __metadata("design:paramtypes", [])
], User);
exports.User = User;
let UserPostEdge = class UserPostEdge extends dbtypes_1.Edge {
};
UserPostEdge = __decorate([
    decorators_1.GraphItem("USER_POST"),
    __metadata("design:paramtypes", [])
], UserPostEdge);
exports.UserPostEdge = UserPostEdge;
let LikeEdge = class LikeEdge extends dbtypes_1.Edge {
};
LikeEdge = __decorate([
    decorators_1.GraphItem("LIKE"),
    __metadata("design:paramtypes", [])
], LikeEdge);
exports.LikeEdge = LikeEdge;
let UserCommentEdge = class UserCommentEdge extends dbtypes_1.Edge {
};
UserCommentEdge = __decorate([
    decorators_1.GraphItem("USER_COMMENT"),
    __metadata("design:paramtypes", [])
], UserCommentEdge);
exports.UserCommentEdge = UserCommentEdge;
//# sourceMappingURL=user.js.map