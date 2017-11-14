"use strict";
const registry_1 = require("./registry");
let requiredir = require("requiredir");
class Discoverer {
    constructor(_logger) {
        this._logger = _logger;
    }
    loadFile(path) {
        registry_1.ClassRegistry.initialize();
        this._logger.info(`Load file : ${path}`);
        require(path);
        return registry_1.ClassRegistry.current;
    }
    loadDirectory(path) {
        registry_1.ClassRegistry.initialize();
        this._logger.info(`Load directory : ${path}`);
        requiredir(path);
        return registry_1.ClassRegistry.current;
    }
}
exports.Discoverer = Discoverer;
//# sourceMappingURL=discoverer.js.map