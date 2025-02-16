export class CustomError extends Error {
	constructor(message: string, public statusCode: number) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class BadRequestError extends CustomError {
	constructor(message: string = 'Bad Request') {
		super(message, 400);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message: string = 'Unauthorized') {
		super(message, 401);
	}
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
	constructor(message: string = 'Resource Not Found') {
		super(message, 404);
	}
}
