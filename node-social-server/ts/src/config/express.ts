import { Application }  from  "express";
import logger = require( "morgan" );
import httpStatus = require( "http-status" );
import config from "./env";
import winstonInstance from "./winston";
import APIError from "../utils/APIError";
import { ErrorRequestHandler } from "express";
import { Kernel, injectable, inject } from "inversify";
import configureAuth from "./authentication";
import passport = require("passport");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require( "compression");
const cors = require( "cors" );
const expressWinston = require( "express-winston");
const expressValidation = require( "express-validation" );
const methodOverride = require( "method-override" );

export function configureExpress( app: Application ) {
	if (config.env === "development") {
		app.use(logger("dev"));
	}

	// parse body params and attache them to req.body
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(cookieParser());
	app.use(compress());
	app.use(methodOverride());

	// disable 'X-Powered-By' header in response
	app.disable("x-powered-by");

	// enable CORS - Cross Origin Resource Sharing
	app.use(cors());

	// Initialize Passport and restore authentication state, if any, from the
	// session.
	app.use(passport.initialize());
	app.use(passport.session());

	// enable detailed API logging in dev env
	if (config.env === "development") {
		expressWinston.requestWhitelist.push("body");
		expressWinston.responseWhitelist.push("body");
		app.use(expressWinston.logger({
			winstonInstance,
			meta: true, 	// optional: log meta data about request (defaults to true)
			msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
			colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
		}));
	}
}

export function configureErrors( app: Application ) {
		// if error is not an instanceOf APIError, convert it.
	app.use(<ErrorRequestHandler>(err, req, res, next) => {
		if (err instanceof expressValidation.ValidationError) {
			// validation error contains errors which is an array of error each containing message[]
			const unifiedErrorMessage = err.errors.map(error => error.messages.join(". ")).join(" and ");
			const error = new APIError(unifiedErrorMessage, err.status, true);
			return next(error);
		} else if (!(err instanceof APIError)) {
			const apiError = new APIError(err.message, err.status, err.isPublic);
			return next(apiError);
		}
		return next(err);
	});

	// // catch 404 and forward to error handler
	app.use((req, res, next) => {
		console.log(res.statusCode);
		const err = new APIError("API not found", httpStatus.NOT_FOUND);
		return next(err);
	});

	// // log error in winston transports except when executing test suite
	if (config.env !== "test") {
		app.use(expressWinston.errorLogger({
			winstonInstance
		}));
	}

	// // error handler, send stacktrace only during development
	app.use(<ErrorRequestHandler>(err, req, res, next) =>		// eslint-disable-line no-unused-vars
		res.status(err.status).json({
			message: err.isPublic ? err.message : httpStatus[err.status],
			stack: config.env === "development" ? err.stack : {}
		})
	);
};