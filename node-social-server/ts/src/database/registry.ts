
export class ClassRegistry {
    private _classes: {[key: string]: Function} = {};

    private static _current: ClassRegistry;

    static get current(){
        if (!ClassRegistry._current) {
            ClassRegistry.initialize();
        }

        return ClassRegistry._current;
    }

    static initialize() {
        ClassRegistry._current = new ClassRegistry();
    }

    register(className: string, gClass: Function) {
        this._classes[className] = gClass;
    }

    getClasses(): {[key: string]: Function} {
        return this._classes;
    }
}