"use strict";
const discoverer_1 = require("./discoverer");
const deployer_1 = require("./deployer");
const NeoGraphDb_1 = require("../services/impl/NeoGraphDb");
const channel_1 = require("./graph/channel");
const winston = require("winston");
const env_1 = require("../config/env");
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: "debug",
            handleExceptions: true
        }),
        new (winston.transports.File)({
            colorize: false,
            handleExceptions: true,
            json: true,
            filename: "./logs/activity.log"
        })
    ],
    exitOnError: false
});
let neo4j = require("neo4j");
let db = new neo4j.GraphDatabase(env_1.default.neo4j);
const graphService = new NeoGraphDb_1.NeoGraphDb(db);
let discoverer = new discoverer_1.Discoverer(logger);
let registry = discoverer.loadDirectory("./graph");
let deployer = new deployer_1.DbDeployer(registry, graphService, logger);
deployer
    .launch()
    .then(r => {
    const channel = new channel_1.Channel();
    channel.name = "Général";
    return graphService.createVertex(channel);
})
    .then(c => db.close());
//# sourceMappingURL=setup.js.map