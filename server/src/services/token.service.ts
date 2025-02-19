import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const decodeAccessToken = (token: string) => {
	const tokenInfo: any = jwt.verify(token, process.env.JWT_SECRET!);
	return tokenInfo.user as User;
};

export const decodeJWTToken = (token: string) => {
	return jwt.verify(
		token,
		process.env.JWT_SECRET!,
	);
};
