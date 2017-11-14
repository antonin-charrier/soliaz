import httpStatus = require( "http-status" );

/**
 * @extends Error
 */
class ExtendableError extends Error {
	status: string;
	isPublic: boolean;
	isOperational: boolean;

	constructor(message, status, isPublic) {
		super(message);
		this.name = (<any>this.constructor).name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		this.isOperational = true;	// This is required since bluebird 4 doesn't append it anymore.
		(<any>Error).captureStackTrace(this, this.name);
	}
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
	/**
	 * Creates an API error.
	 * @param {string} message - Error message.
	 * @param {number} status - HTTP status code of error.
	 * @param {boolean} isPublic - Whether the message should be visible to user or not.
	 */
	constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
		super(message, status, isPublic);
	}
}

export default APIError;
