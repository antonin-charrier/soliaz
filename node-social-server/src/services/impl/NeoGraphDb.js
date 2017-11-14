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
const connection_1 = require("../../utils/connection");
const decorators_1 = require("../../database/decorators");
require("reflect-metadata");
const inversify_1 = require("inversify");
const uuid = require("uuid");
let NeoGraphDb = NeoGraphDb_1 = class NeoGraphDb {
    constructor(uri, cypher) {
        this.cypher = cypher;
        this._db = connection_1.Neo4jConnection.getConnection(uri);
        if (!this.cypher) {
            this.cypher = this._db.cypher.bind(this._db);
        }
    }
    createVertex(vertice) {
        let classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, vertice.constructor);
        let propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, vertice.constructor);
        vertice.id = uuid.v4().toString();
        vertice.creationTime = new Date().getTime();
        let dbVertex = {};
        for (let key in propsMeta.properties) {
            let pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && (vertice[key] === undefined || vertice[key] === null)) {
                throw new Error(`Property ${key} of vertice ${classMeta.name} is required`);
            }
            if (vertice[key] !== undefined) {
                dbVertex[key] = vertice[key];
            }
        }
        let dbVertexQuery = `(:${classMeta.name} ${this.serializeGraphProperty(dbVertex)})`;
        return this.query(`create ${dbVertexQuery}`, dbVertex)
            .then(r => vertice)
            .catch(e => {
            throw e;
        });
    }
    updateVertex(vertice) {
        let classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, vertice.constructor);
        let propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, vertice.constructor);
        let query = `match (v:${classMeta.name} {id: '${vertice.id}'}) set `;
        let builder = [];
        for (let propName in propsMeta.properties) {
            if ((vertice[propName] === undefined || vertice[propName] === null) && propsMeta.properties[propName].mandatory) {
                throw new Error(`Property ${propName} of vertice ${classMeta.name} is required`);
            }
            if (!propsMeta.properties[propName].readonly && vertice[propName] !== undefined) {
                builder.push(`v.${propName} = {${propName}}`);
                builder.push(", ");
            }
        }
        builder.pop();
        query += builder.join("");
        return this.query(query, vertice).then(r => vertice)
            .catch(e => {
            throw e;
        });
    }
    serializeGraphProperty(obj) {
        let builder = ["{"];
        for (let key in obj) {
            if (obj[key] !== undefined && typeof obj[key] !== "object" && typeof obj[key] !== "function") {
                builder.push(`${key}: {${key}}`);
                builder.push(",");
            }
        }
        builder.pop(); // the last ,
        builder.push("}");
        return builder.join("");
    }
    deleteEdge(edge) {
        let classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.constructor);
        return this.query(`match ()-[e:${classMeta.name} {id: {id}}]-() delete e`, { id: edge.id });
    }
    createEdge(edge) {
        let fromClassMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.from.constructor);
        let toClassMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.to.constructor);
        let classMeta = Reflect.getMetadata(decorators_1.GraphItemKey, edge.constructor);
        let propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, edge.constructor);
        edge.id = uuid.v4().toString();
        edge.creationTime = new Date().getTime();
        let dbVertex = {};
        for (let key in propsMeta.properties) {
            let pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && edge[key] === undefined || edge[key] === null) {
                throw new Error(`Property ${key} of vertice ${classMeta.name} is required`);
            }
            if (edge[key] !== undefined) {
                dbVertex[key] = edge[key];
            }
        }
        let dbEdgeQuery = `[:${classMeta.name} ${this.serializeGraphProperty(dbVertex)}]`;
        let query = `
            match (from:${fromClassMeta.name} {id: '${edge.from.id}'})
            match (to:${toClassMeta.name} {id: '${edge.to.id}'})
            create (from)-${dbEdgeQuery}->(to)`;
        return this.query(query, dbVertex)
            .then(r => edge)
            .catch(e => {
            throw e;
        });
    }
    query(query, params) {
        return new Promise((resolve, reject) => {
            try {
                this.cypher({
                    query,
                    params,
                    lean: true
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    first(query, params) {
        return this.query(query, params).then(r => r[0]);
    }
    transaction(scope) {
        return new Promise((resolve, reject) => {
            let tx = this._db.beginTransaction();
            let db = new NeoGraphDb_1(this._db, tx.cypher.bind(tx));
            let commit = (result) => {
                try {
                    tx.commit(() => resolve(result));
                }
                catch (e) {
                    reject(e);
                }
            };
            let rollback = (reason) => {
                try {
                    tx.rollback(() => reject(new Error(reason)));
                }
                catch (e) {
                    reject(e);
                }
            };
            try {
                let res = scope(db, commit, rollback);
                if (res && typeof res.then === "function") {
                    res.then(val => {
                        commit(val);
                    }, e => {
                        rollback(e);
                    });
                }
            }
            catch (e) {
                rollback(e);
            }
        });
    }
};
NeoGraphDb = NeoGraphDb_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, Object])
], NeoGraphDb);
exports.NeoGraphDb = NeoGraphDb;
var NeoGraphDb_1;
//# sourceMappingURL=NeoGraphDb.js.map