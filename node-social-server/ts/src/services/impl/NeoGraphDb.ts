import { Vertex, Edge, GraphItemBase } from "../../database/dbtypes";
import { Neo4jConnection } from "../../utils/connection";
import { IGraphDb } from "../IGraphDb";
import { GraphItemKey, PropertiesKey, PropertiesMeta, GraphClassMeta } from "../../database/decorators";
import "reflect-metadata";
import { injectable } from "inversify";
const uuid = require("uuid");

@injectable()
export class NeoGraphDb implements IGraphDb {
    private _db: any;

    constructor( uri: string, private cypher?: any ) {
        this._db = Neo4jConnection.getConnection(uri);

        if (!this.cypher) {
            this.cypher = this._db.cypher.bind(this._db);
        }
    }

    createVertex<T extends Vertex>( vertice: T ): Promise<T> {
        let classMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, vertice.constructor);
        let propsMeta: PropertiesMeta = Reflect.getMetadata(PropertiesKey, vertice.constructor);

        vertice.id = uuid.v4().toString();
        vertice.creationTime = new Date().getTime();

        let dbVertex = {};

        for (let key in propsMeta.properties) {
            let pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && (vertice[key] === undefined || vertice[key] === null) ) {
                throw new Error(`Property ${key} of vertice ${classMeta.name} is required`);
            }
            if ( vertice[key] !== undefined ) {
                dbVertex[key] = vertice[key];
            }
        }

        let dbVertexQuery = `(:${classMeta.name} ${this.serializeGraphProperty(dbVertex)})`;

        return this.query<T>(`create ${dbVertexQuery}`, dbVertex)
            .then( r => vertice )
            .catch(e => { 
                throw e; 
            });
    }

    updateVertex<T extends Vertex>( vertice: T ): Promise<T> {
        let classMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, vertice.constructor);
        let propsMeta: PropertiesMeta = Reflect.getMetadata(PropertiesKey, vertice.constructor);

        let query = `match (v:${classMeta.name} {id: '${vertice.id}'}) set `;
        let builder: string[] = [];

        for (let propName in propsMeta.properties) {
            if ((vertice[propName] === undefined || vertice[propName] === null) && propsMeta.properties[propName].mandatory) {
                throw new Error(`Property ${propName} of vertice ${classMeta.name} is required`);
            }
            if (!propsMeta.properties[propName].readonly && vertice[propName] !== undefined ) {
                builder.push(`v.${propName} = {${propName}}`);
                builder.push(", ");
            }
        }

        builder.pop();
        query += builder.join("");

        return this.query<T>(query, vertice).then( r => vertice )
            .catch(e => { 
                throw e; 
            });
    }

    serializeGraphProperty(obj: any): string {
        let builder = ["{"];
        for (let key in obj) {
            if (obj[key] !== undefined &&  typeof obj[key] !== "object" && typeof obj[key] !== "function" ) {
                builder.push(`${key}: {${ key }}`);
                builder.push(",");
            }
        }

        builder.pop(); // the last ,
        builder.push("}");
        return builder.join("");
    }

    deleteEdge<TFrom extends Vertex, TTo extends Vertex>( edge: Edge<TFrom, TTo> ): Promise<Edge<TFrom, TTo>> {
        let classMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, edge.constructor);
        
        return this.query(`match ()-[e:${classMeta.name} {id: {id}}]-() delete e`, {id: edge.id});
    }

    createEdge<TFrom extends Vertex, TTo extends Vertex>( edge: Edge<TFrom, TTo>): Promise<Edge<TFrom, TTo>> {
        let fromClassMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, edge.from.constructor);
        let toClassMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, edge.to.constructor);

        let classMeta: GraphClassMeta = Reflect.getMetadata(GraphItemKey, edge.constructor);
        let propsMeta: PropertiesMeta = Reflect.getMetadata(PropertiesKey, edge.constructor);

        edge.id = uuid.v4().toString();
        edge.creationTime = new Date().getTime();
        let dbVertex = {};

        for (let key in propsMeta.properties) {
            let pMeta = propsMeta.properties[key];
            if (pMeta.mandatory && edge[key] === undefined || edge[key] === null ) {
                throw new Error(`Property ${key} of vertice ${classMeta.name} is required`);
            }
            if ( edge[key] !== undefined ) {
                dbVertex[key] = edge[key];
            }
        }

        let dbEdgeQuery = `[:${classMeta.name} ${this.serializeGraphProperty(dbVertex)}]`;
        let query = `
            match (from:${fromClassMeta.name} {id: '${ edge.from.id }'})
            match (to:${toClassMeta.name} {id: '${ edge.to.id }'})
            create (from)-${dbEdgeQuery}->(to)`;

        return this.query(query, dbVertex)
            .then( r => edge )
            .catch( e => {
                throw e;
            });
    }

    query<T>( query: string );
    query<T>( query: string, params: any );
    query<T>( query: string, params?: any ): Promise<T[]> {

        return new Promise<T[]>((resolve, reject) => {
            try {
                this.cypher({
                    query,
                    params,
                    lean: true
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    first<T>( query: string, params?: any ): Promise<T> {
        return this.query<T>(query, params).then(r => r[0]);
    }

    transaction<T>( scope: (db: IGraphDb, commit: (result: T) => void, rollback: (reason?: any) => void) => void ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            
            let tx = this._db.beginTransaction();
            let db = new NeoGraphDb(this._db, tx.cypher.bind(tx));
            let commit = (result: T) => {
                try {
                    tx.commit(() => resolve(result)); 
                } catch (e) {
                    reject(e);
                }
            };

            let rollback = (reason: any) => {
                try {
                    tx.rollback(() => reject(new Error(reason)));
                } catch (e) {
                    reject(e);
                }
            };

            try {
                let res: any = scope(db, commit, rollback );
                if (res && typeof res.then === "function") {
                    res.then(val => { 
                        commit(val); 
                    }, e => { 
                        rollback(e); 
                    }  );
                }

            } catch (e) {
                rollback(e);
            }
        } );
    }
}