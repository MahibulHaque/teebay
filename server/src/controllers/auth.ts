import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/error';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {
	userLoginValidationSchema,
	userSignupValidationSchema,
} from '../validators/auth';
import { checkUserCredentials, createUser } from '../services/auth.service';
import {
	generateAccessToken,
	generateRefreshToken,
	ICreateTokenPayload,
	verifyAccessToken,
	verifyRefreshToken,
} from '../services/token.service';

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = userLoginValidationSchema.parse(req.body);

		const user = await checkUserCredentials({ email, password });

		const accessToken = generateAccessToken(user);
		res.cookie(ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
		});

		const refreshToken = generateRefreshToken(user);
		res.cookie(REFRESH_TOKEN, refreshToken, {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
		});

		res.status(200).json({
			status: 'success',
			message: 'User logged in successfully',
			data: {
				accessToken,
				refreshToken,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const signUpContrtoller = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const payload = userSignupValidationSchema.parse(req.body);

		await createUser(payload);
		res.status(201).json({
			status: 'success',
			message: 'User created successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const tokenController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			throw new ForbiddenError('Refresh token not found');
		}
		const decodedRefreshToken = verifyRefreshToken(refreshToken);

		const accessToken = generateAccessToken(
			decodedRefreshToken as ICreateTokenPayload,
		);

		res.cookie(ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
		});
		res.status(200).json({
			status: 'success',
			message: 'Token generated successfully',
			data: { accessToken },
		});
	} catch (error) {
		next(error);
	}
};

export const verifyTokenController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			throw new UnauthorizedError();
		}
		verifyRefreshToken(refreshToken);
		res.status(200).json({
			status: 'success',
			message: 'User login successful',
			data: null,
		});
	} catch (error) {
		next(error);
	}
};

export const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.cookie(ACCESS_TOKEN, '', {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
			expires: new Date(0),
		});

		res.cookie(REFRESH_TOKEN, '', {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
			expires: new Date(0),
		});

		res.status(200).json({
			status: 'success',
			data: null,
			message: 'User logged out successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const loggedInUserInfoController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { accessToken } = req.cookies;

		const decodedAccessToken = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;
		res.status(200).json({
			status: 'success',
			message: 'User info retrived',
			data: {
				loggedInUserInfo: {
					firstName: decodedAccessToken.firstName,
					lastName: decodedAccessToken.lastName,
					email: decodedAccessToken.email,
				},
			},
		});
	} catch (error) {
		next(error);
	}
};
