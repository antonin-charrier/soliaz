"use strict";
const decorators_1 = require("./decorators");
class DbDeployer {
    constructor(registry, _db, _logger) {
        this.registry = registry;
        this._db = _db;
        this._logger = _logger;
    }
    createUniqueConstraint(vertice, property) {
        this._logger.info(`create unique contraint for ${vertice} on ${property}`);
        let query = `CREATE CONSTRAINT ON (v:${vertice}) ASSERT v.${property} IS UNIQUE`;
        return this._db.query(query).then(r => {
            this._logger.info(`unique contraint for ${vertice} on ${property} created successfully`);
            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        });
    }
    createIndex(vertice, property) {
        this._logger.info(`create index for ${vertice} on ${property}`);
        let query = `CREATE INDEX ON :${vertice}(${property})`;
        return this._db.query(query).then(r => {
            this._logger.info(`index for ${vertice} on ${property} created successfully`);
            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        });
    }
    launch() {
        this._logger.info("Start dbsetup");
        let classes = this.registry.getClasses();
        let asyncFunc = [];
        for (let name in classes) {
            let propsMeta = Reflect.getMetadata(decorators_1.PropertiesKey, classes[name]);
            if (propsMeta) {
                propsMeta.uniques.forEach(prop => asyncFunc.push(() => this.createUniqueConstraint(name, prop)));
                propsMeta.indexes.forEach(prop => asyncFunc.push(() => this.createIndex(name, prop)));
            }
        }
        let all = asyncFunc.reduce((prevFunc, current) => {
            return () => {
                return prevFunc().then(r => current());
            };
        }, () => Promise.resolve(true));
        return all().then(r => {
            this._logger.info("End dbsetup");
            return r;
        }, e => {
            this._logger.error("dbsetup error: ", e);
            return e;
        });
    }
}
exports.DbDeployer = DbDeployer;
//# sourceMappingURL=deployer.js.map