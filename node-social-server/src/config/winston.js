"use strict";
const winston = require("winston");
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: "debug",
            handleExceptions: true
        }),
    ],
    exitOnError: false
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
//# sourceMappingURL=winston.js.map