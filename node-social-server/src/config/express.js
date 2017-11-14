"use strict";
const logger = require("morgan");
const httpStatus = require("http-status");
const env_1 = require("./env");
const winston_1 = require("./winston");
const APIError_1 = require("../utils/APIError");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const expressWinston = require("express-winston");
const expressValidation = require("express-validation");
const methodOverride = require("method-override");
function configureExpress(app) {
    if (env_1.default.env === "development") {
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
    if (env_1.default.env === "development") {
        expressWinston.requestWhitelist.push("body");
        expressWinston.responseWhitelist.push("body");
        app.use(expressWinston.logger({
            winstonInstance: winston_1.default,
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
            colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
        }));
    }
}
exports.configureExpress = configureExpress;
function configureErrors(app) {
    // if error is not an instanceOf APIError, convert it.
    app.use((err, req, res, next) => {
        if (err instanceof expressValidation.ValidationError) {
            // validation error contains errors which is an array of error each containing message[]
            const unifiedErrorMessage = err.errors.map(error => error.messages.join(". ")).join(" and ");
            const error = new APIError_1.default(unifiedErrorMessage, err.status, true);
            return next(error);
        }
        else if (!(err instanceof APIError_1.default)) {
            const apiError = new APIError_1.default(err.message, err.status, err.isPublic);
            return next(apiError);
        }
        return next(err);
    });
    // // catch 404 and forward to error handler
    app.use((req, res, next) => {
        console.log(res.statusCode);
        const err = new APIError_1.default("API not found", httpStatus.NOT_FOUND);
        return next(err);
    });
    // // log error in winston transports except when executing test suite
    if (env_1.default.env !== "test") {
        app.use(expressWinston.errorLogger({
            winstonInstance: winston_1.default
        }));
    }
    // // error handler, send stacktrace only during development
    app.use((err, req, res, next) => res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: env_1.default.env === "development" ? err.stack : {}
    }));
}
exports.configureErrors = configureErrors;
;
//# sourceMappingURL=express.js.map