"use strict";
const registry_1 = require("../registry");
require("reflect-metadata");
exports.Key = "GraphClassMeta";
function GraphItem(className, superClassName) {
    return function (target) {
        Reflect.defineMetadata(exports.Key, {
            name: className,
            superClassName
        }, target);
        registry_1.ClassRegistry.current.register(className, target);
        return target;
    };
}
exports.GraphItem = GraphItem;
//# sourceMappingURL=GraphItem.js.map