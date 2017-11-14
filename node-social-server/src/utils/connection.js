"use strict";
let neo4j = require("neo4j");
class Neo4jConnection {
    static getConnection(uri) {
        if (this.db) {
            return this.db;
        }
        return this.connect(uri);
    }
    static connect(uri) {
        return new neo4j.GraphDatabase(uri);
    }
}
exports.Neo4jConnection = Neo4jConnection;
//# sourceMappingURL=connection.js.map