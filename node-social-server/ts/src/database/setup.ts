import {Discoverer} from "./discoverer";
import {ClassRegistry} from "./registry";
import {DbDeployer} from "./deployer";
import TYPES from "../constants/types";
import { LoggerInstance } from "winston";
import { IGraphDb } from "../services/IGraphDb";
import { NeoGraphDb} from "../services/impl/NeoGraphDb";
import { User } from "./graph/user";
import { Channel } from "./graph/channel";

import winston = require( "winston" );
import config from "../config/env";

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			level: "debug",
            handleExceptions: true
		}),
		new (winston.transports.File)( {
			colorize: false,
			handleExceptions: true,
			json: true,
			filename: "./logs/activity.log"
		} )
	],
	exitOnError: false
});

let neo4j = require("neo4j");
let db = new neo4j.GraphDatabase(config.neo4j);

const graphService = new NeoGraphDb(db);
let discoverer = new Discoverer(logger);
let registry = discoverer.loadDirectory("./graph");
let deployer = new DbDeployer(registry, graphService, logger);

deployer
	.launch()
	.then( r => {
		const channel = new Channel();
		channel.name = "Général";
		return graphService.createVertex(channel);
	})
	.then(c => db.close());