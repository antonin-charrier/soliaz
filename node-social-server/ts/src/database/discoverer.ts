import { ClassRegistry } from "./registry";
import { LoggerInstance } from "winston";

let requiredir  = require("requiredir");

export class Discoverer {
    constructor( private _logger: LoggerInstance  ) {

    }

    loadFile(path: string): ClassRegistry {
        ClassRegistry.initialize();

        this._logger.info(`Load file : ${path}` );

        require(path);
        return ClassRegistry.current;
    }

    loadDirectory(path: string): ClassRegistry {
        ClassRegistry.initialize();

        this._logger.info(`Load directory : ${path}` );

        requiredir(path);
        return ClassRegistry.current;
    }
}