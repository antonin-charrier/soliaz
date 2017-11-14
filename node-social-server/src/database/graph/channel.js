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
let Channel = class Channel extends dbtypes_1.Vertex {
};
__decorate([
    decorators_1.Prop({
        indexed: true,
        mandatory: true
    }),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
Channel = __decorate([
    decorators_1.GraphItem("Channel"),
    __metadata("design:paramtypes", [])
], Channel);
exports.Channel = Channel;
let ChannelPostEdge = class ChannelPostEdge extends dbtypes_1.Edge {
};
ChannelPostEdge = __decorate([
    decorators_1.GraphItem("CHANNEL_POST"),
    __metadata("design:paramtypes", [])
], ChannelPostEdge);
exports.ChannelPostEdge = ChannelPostEdge;
//# sourceMappingURL=channel.js.map