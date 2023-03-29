const { StatusCodes } = require("http-status-codes");

class ApiError extends Error {
	constructor(message) {
		super(message);
	}
}

class BadRequestError extends ApiError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.BAD_REQUEST;
	}
}

class UnauthenticatedError extends ApiError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.UNAUTHORIZED;
	}
}

class NotFoundError extends ApiError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.NOT_FOUND;
	}
}

module.exports = {
	ApiError,
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
};
