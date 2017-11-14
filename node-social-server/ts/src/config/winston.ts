import winston = require( "winston" );

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			level: "debug",
            handleExceptions: true
		}),
		// new (winston.transports.File)( {
		// 	colorize: false,
		// 	handleExceptions: true,
		// 	json: true,
		// 	filename: "./logs/activity.log"
		// } )
	],
	exitOnError: false
});

export default logger;