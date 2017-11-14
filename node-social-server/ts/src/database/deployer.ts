import { ClassRegistry } from "./registry";
import { LoggerInstance } from "winston";
import { GraphItemKey, GraphClassMeta, PropertiesMeta, PropertiesKey } from "./decorators";
import { IGraphDb } from "../services/IGraphDb";

export class DbDeployer {
    constructor(public registry: ClassRegistry, private _db: IGraphDb, private _logger: LoggerInstance) {

    }

    createUniqueConstraint(vertice: string, property: string) {
        this._logger.info(`create unique contraint for ${vertice} on ${property}`);
        let query = `CREATE CONSTRAINT ON (v:${vertice}) ASSERT v.${property} IS UNIQUE`;

        return this._db.query<any>(query).then( r => {
            this._logger.info(`unique contraint for ${vertice} on ${property} created successfully`);

            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        } );
    }

    createIndex(vertice: string, property: string): Promise<any> {
        this._logger.info(`create index for ${vertice} on ${property}`);
        let query = `CREATE INDEX ON :${vertice}(${property})`;

        return this._db.query<any>(query).then( r => {
            this._logger.info(`index for ${vertice} on ${property} created successfully`);

            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        } );
    }

    launch(): Promise<any[]> {
        this._logger.info( "Start dbsetup" );
        let classes = this.registry.getClasses();
        let asyncFunc: Array<() => Promise<any>> = [];

        for (let name in classes) {
            let propsMeta: PropertiesMeta = Reflect.getMetadata(PropertiesKey, classes[name]);
            if (propsMeta) {
                propsMeta.uniques.forEach( prop => asyncFunc.push( () => this.createUniqueConstraint( name, prop )));
                propsMeta.indexes.forEach( prop => asyncFunc.push( () => this.createIndex( name, prop )));
            }
        }

        let all = asyncFunc.reduce((prevFunc, current) => {
            return () => {
                return prevFunc().then( r => current() );
            };
        }, () => Promise.resolve(true));

        return all().then(r => {
            this._logger.info( "End dbsetup" );
            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        });
    }
}