import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../utils/error';

interface IGetUserAuthInfoRequest extends Request {
	user: string | jwt.JwtPayload | undefined;
}
export const AuthMiddleWare = (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction,
) => {
	const token: string = req.cookies.accessToken;

	try {
		if (!token) {
			throw new ForbiddenError();
		}

		jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
			if (err) throw new ForbiddenError('Verification failed');
			req.user = user;
			next();
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};
