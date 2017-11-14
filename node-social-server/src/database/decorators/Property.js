"use strict";
require("reflect-metadata");
const deepcopy = require("deepcopy");
const Key = "PropertiesMeta";
exports.Key = Key;
function Prop(propertyMeta) {
    return function (target, propertyName) {
        let meta = deepcopy(Reflect.getMetadata(Key, target.constructor) || {
            properties: {},
            indexes: [],
            uniques: []
        });
        propertyMeta = propertyMeta || {};
        if (!propertyMeta.typeName) {
            let t = Reflect.getMetadata("design:type", target, propertyName);
            if (!t) {
                throw new Error(`Unable to resolve type. You must provide a type for ${propertyName} on ${target.name}`);
            }
            propertyMeta.typeName = t.name;
        }
        if (propertyMeta.unique) {
            meta.uniques.push(propertyName);
        }
        if (propertyMeta.indexed && !propertyMeta.unique) {
            meta.indexes.push(propertyName);
        }
        meta.properties[propertyName] = propertyMeta;
        Reflect.defineMetadata(Key, meta, target.constructor);
        return target;
    };
}
exports.Prop = Prop;
//# sourceMappingURL=Property.js.map