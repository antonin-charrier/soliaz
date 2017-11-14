import { ClassRegistry } from "../registry";
import "reflect-metadata";

export const Key = "GraphClassMeta";

export interface GraphClassMeta {
    name: string;
    superClassName: string;
}

export function GraphItem(className: string, superClassName?: string): ClassDecorator {

    return function(target: ObjectConstructor): ObjectConstructor {

        Reflect.defineMetadata(Key, {
            name: className,
            superClassName
        }, target);
        ClassRegistry.current.register(className, target);

        return target;
    };
}