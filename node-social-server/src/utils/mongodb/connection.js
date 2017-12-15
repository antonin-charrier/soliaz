"use strict";
var mongodb_1 = require('mongodb');
var url = 'mongodb://localhost:27017/node-social-server';
var MongoDBConnection = (function () {
    function MongoDBConnection() {
    }
    MongoDBConnection.getConnection = function (result) {
        var _this = this;
        if (this.isConnected) {
            return result(this.db);
        }
        else {
            this.connect(function (error, db) {
                return result(_this.db);
            });
        }
    };
    MongoDBConnection.connect = function (result) {
        var _this = this;
        mongodb_1.MongoClient.connect(url, function (error, db) {
            _this.db = db;
            _this.isConnected = true;
            return result(error, db);
        });
    };
    MongoDBConnection.isConnected = false;
    return MongoDBConnection;
}());
exports.MongoDBConnection = MongoDBConnection;
//# sourceMappingURL=connection.js.map