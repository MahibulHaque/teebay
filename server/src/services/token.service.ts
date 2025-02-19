import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const decodeAccessToken = (token: string) => {
	const tokenInfo:any = jwt.verify(
		token,
		process.env.JWT_SECRET!,
	);
    return tokenInfo.user as User;
};
