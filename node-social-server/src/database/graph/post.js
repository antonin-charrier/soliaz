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
let Post = class Post extends dbtypes_1.Vertex {
};
__decorate([
    decorators_1.Prop({
        mandatory: true
    }),
    __metadata("design:type", String)
], Post.prototype, "message", void 0);
Post = __decorate([
    decorators_1.GraphItem("Post"),
    __metadata("design:paramtypes", [])
], Post);
exports.Post = Post;
let PostCommentEdge = class PostCommentEdge extends dbtypes_1.Edge {
};
PostCommentEdge = __decorate([
    decorators_1.GraphItem("POST_COMMENT"),
    __metadata("design:paramtypes", [])
], PostCommentEdge);
exports.PostCommentEdge = PostCommentEdge;
//# sourceMappingURL=post.js.map