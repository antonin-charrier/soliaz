import "reflect-metadata";
const deepcopy = require("deepcopy");

const Key = "PropertiesMeta";

export interface PropertyMetadata {
    typeName?: string;
    edge?: string;
    mandatory?: boolean;
    unique?: boolean;
    indexed?: boolean;
    readonly?: boolean;
}

export interface PropertiesMeta {
    properties: {[propertyName: string]: PropertyMetadata};
    indexes: string[];
    uniques: string[];
}

export function Prop( propertyMeta?: PropertyMetadata ): PropertyDecorator {
    return function(target: Object, propertyName: any) {
        let meta: PropertiesMeta =  deepcopy(Reflect.getMetadata(Key, target.constructor ) || {
            properties: {},
            indexes: [],
            uniques: []
         });

        propertyMeta = propertyMeta || { };

        if (!propertyMeta.typeName) {
            let t = Reflect.getMetadata("design:type", target, propertyName);
            if (!t) {
                throw new Error(`Unable to resolve type. You must provide a type for ${propertyName} on ${(<any>target).name}`);
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

export { Key };