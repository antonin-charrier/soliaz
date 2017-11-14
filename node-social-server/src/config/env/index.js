"use strict";
const path = require("path");
const _ = require("lodash");
const env = process.env.NODE_ENV || "development";
const config = require(`./${env}`).default;
const defaults = {
    root: path.join(__dirname, "/..")
};
_.assign(config, defaults);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=index.js.map