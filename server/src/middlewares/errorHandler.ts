import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/error';

interface ErrorResponse {
	success: boolean;
	message: string;
	stack?: string;
	errors?: any[];
}

export const errorHandlerMiddleware = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const response: ErrorResponse = {
		success: false,
		message: 'Internal Server Error',
	};
	
	if (process.env.NODE_ENV === 'development') {
		response.stack = err.stack;
	}
	
	if (err instanceof CustomError) {
		response.message = err.message;
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
			error: {
				code: err.statusCode,
				details: err.message || 'Something went wrong on the server.',
			},
		});
	}

	return res.status(500).json(response);
};
