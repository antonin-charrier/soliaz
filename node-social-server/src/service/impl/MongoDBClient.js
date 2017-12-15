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
var mongodb_1 = require('mongodb');
var inversify_1 = require('inversify');
var connection_1 = require('../../utils/mongodb/connection');
var MongoDBClient = (function () {
    function MongoDBClient() {
        var _this = this;
        connection_1.MongoDBConnection.getConnection(function (connection) {
            _this.db = connection;
        });
    }
    MongoDBClient.prototype.find = function (collection, filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("aaa");
            _this.db.collection(collection).find(filter).toArray(function (error, find) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(find);
                }
            });
        });
    };
    MongoDBClient.prototype.findOneById = function (collection, objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.collection(collection).find({ _id: new mongodb_1.ObjectID(objectId) }).limit(1).toArray(function (error, find) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(find[0]);
                }
            });
        });
    };
    MongoDBClient.prototype.insert = function (collection, model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.collection(collection).insertOne(model, function (error, insert) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(insert);
                }
            });
        });
    };
    MongoDBClient.prototype.update = function (collection, objectId, model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.collection(collection).updateOne({ _id: new mongodb_1.ObjectID(objectId) }, model, function (error, update) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(model);
                }
            });
        });
    };
    MongoDBClient.prototype.remove = function (collection, objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.collection(collection).deleteOne({ _id: new mongodb_1.ObjectID(objectId) }, function (error, remove) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(remove);
                }
            });
        });
    };
    MongoDBClient = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], MongoDBClient);
    return MongoDBClient;
}());
exports.MongoDBClient = MongoDBClient;
//# sourceMappingURL=MongoDBClient.js.map