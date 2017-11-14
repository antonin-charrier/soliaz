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
const decorators_1 = require("./decorators");
const decorators_2 = require("./decorators");
class GraphItemBase extends Object {
    constructor(idOrObj) {
        super();
        if (typeof idOrObj === "string") {
            this.id = idOrObj;
        }
        else if (typeof idOrObj === "object") {
            let propsMeta = Reflect.getMetadata(decorators_2.PropertiesKey, this.constructor);
            if (!propsMeta) {
                throw new Error("Cannot resolve metadata for graph item: " + this.constructor);
            }
            for (let propName in idOrObj) {
                this[propName] = idOrObj[propName];
            }
        }
    }
}
exports.GraphItemBase = GraphItemBase;
class Vertex extends GraphItemBase {
}
__decorate([
    decorators_1.Prop({
        indexed: true,
        unique: true,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", String)
], Vertex.prototype, "id", void 0);
__decorate([
    decorators_1.Prop({
        indexed: true,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", Number)
], Vertex.prototype, "creationTime", void 0);
exports.Vertex = Vertex;
class Edge extends GraphItemBase {
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }
}
__decorate([
    decorators_1.Prop({
        indexed: false,
        unique: false,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", String)
], Edge.prototype, "id", void 0);
__decorate([
    decorators_1.Prop({
        indexed: false,
        mandatory: true,
        readonly: true
    }),
    __metadata("design:type", Number)
], Edge.prototype, "creationTime", void 0);
exports.Edge = Edge;
//# sourceMappingURL=dbtypes.js.map