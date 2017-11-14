"use strict";
class ClassRegistry {
    constructor() {
        this._classes = {};
    }
    static get current() {
        if (!ClassRegistry._current) {
            ClassRegistry.initialize();
        }
        return ClassRegistry._current;
    }
    static initialize() {
        ClassRegistry._current = new ClassRegistry();
    }
    register(className, gClass) {
        this._classes[className] = gClass;
    }
    getClasses() {
        return this._classes;
    }
}
exports.ClassRegistry = ClassRegistry;
//# sourceMappingURL=registry.js.map