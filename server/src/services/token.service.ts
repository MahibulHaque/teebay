import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export interface ICreateTokenPayload {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

export const generateAccessToken = (user: ICreateTokenPayload) => {
	const jwtPayload = {
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};
	return jwt.sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '420s' });
};

export const generateRefreshToken = (user: User) => {
	const jwtPayload = {
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};
	return jwt.sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const verifyRefreshToken = (refreshToken: string) => {
	return jwt.verify(refreshToken, process.env.JWT_SECRET!);
};


export const verifyAccessToken = (accessToken:string)=>{
	return jwt.verify(accessToken, process.env.JWT_SECRET!);
}