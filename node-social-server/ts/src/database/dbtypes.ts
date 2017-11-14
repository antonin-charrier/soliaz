import { Prop } from "./decorators";
import { GraphItemKey, PropertiesKey, PropertiesMeta, GraphClassMeta } from "./decorators";

export abstract class GraphItemBase extends Object {
    id: string;
    creationTime: number;

    constructor();
    constructor(id: string);
    constructor(obj: any);
    constructor(idOrObj?: any) {
        super();
        if (typeof idOrObj === "string") {
            this.id = idOrObj;
        } else if (typeof idOrObj === "object") {
            let propsMeta: PropertiesMeta = Reflect.getMetadata(PropertiesKey, this.constructor);
            if (!propsMeta) {
                throw new Error("Cannot resolve metadata for graph item: " + this.constructor);
            }
            
            for (let propName in idOrObj) {
                this[propName] = idOrObj[propName];
            }
        }
    }
}

export abstract class Vertex extends GraphItemBase {

    @Prop({
        indexed: true,
        unique: true,
        mandatory: true,
        readonly: true
    })
    id: string;

     @Prop({
        indexed: true,
        mandatory: true,
        readonly: true
    })
    creationTime: number;
}

export abstract class Edge<TFrom extends Vertex, TTo extends Vertex> extends GraphItemBase {
    from: TFrom;
    to: TTo;

    @Prop({
        indexed: false,
        unique: false,
        mandatory: true,
        readonly: true
    })
    id: string;

     @Prop({
        indexed: false,
        mandatory: true,
        readonly: true
    })
    creationTime: number;

    constructor();
    constructor(from: TFrom, to: TTo);
    constructor(from?: TFrom, to?: TTo) {
        super();
        this.from = from;
        this.to = to;
    }
}
