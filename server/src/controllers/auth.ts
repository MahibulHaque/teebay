import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../lib/token';
import { prisma } from '../lib/prisma';
import {
	CustomError,
	ForbiddenError,
	NotFoundError,
	UnauthorizedError,
} from '../utils/error';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {
	userLoginValidationSchema,
	userSignupValidationSchema,
} from '../validators/auth';

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = userLoginValidationSchema.parse(req.body);

		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new NotFoundError('Invalid email address or password provided');
		}

		if (user.password !== password) {
			throw new UnauthorizedError('Invalid password provided');
		}

		const accessToken = generateAccessToken(user);
		res.cookie(ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			secure: true,
			path: process.env.COOKIE_PATH,
		});

		const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET!, {
			expiresIn: '1d',
		});
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
		const { email, password, firstName, lastName, address, phone } =
			userSignupValidationSchema.parse(req.body);

		await prisma.user.create({
			data: {
				email,
				password,
				firstName,
				lastName,
				address,
				phone,
			},
		});
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
		jwt.verify(
			refreshToken,
			process.env.JWT_SECRET!,
			(error: Error | null, user: any) => {
				if (error) {
					throw new CustomError('Jwt verification failed', 403);
				}
				const accessToken = generateAccessToken(user);
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
			},
		);
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
		jwt.verify(
			refreshToken,
			process.env.JWT_SECRET!,
			(error: Error | null, user: any) => {
				if (error) {
					throw new UnauthorizedError();
				}
				res.status(200).json({
					status: 'success',
					message: 'User login successful',
					data: null,
				});
			},
		);
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
		jwt.verify(
			accessToken,
			process.env.JWT_SECRET!,
			(error: Error | null, user: any) => {
				if (error) {
					console.log(error);
					throw new CustomError('Jwt verification failed', 500);
				}

				res.status(200).json({
					status: 'success',
					message: 'User info retrived',
					data: {
						loggedInUserInfo: {
							firstName: user.user.firstName,
							lastName: user.user.lastName,
							email: user.user.email,
						},
					},
				});
			},
		);
	} catch (error) {
		next(error);
	}
};
