let neo4j = require("neo4j");

export class Neo4jConnection {
    private static db: any;
    
    public static getConnection(uri: string): any {
        if (this.db) {
            return this.db;
        } 
        
        return this.connect(uri);
    }

    public static connect(uri: string): any {
        return new neo4j.GraphDatabase(uri);
    }
}