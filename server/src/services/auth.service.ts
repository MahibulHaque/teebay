import { createNewUser, findUserWithEmail } from '../models/user.model';
import { NotFoundError, UnauthorizedError } from '../utils/error';

interface ICreateUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	address: string;
	phone: string;
}

export const createUser = async (createUserPayload: ICreateUser) => {
	return createNewUser(createUserPayload);
};

export const checkUserCredentials = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await findUserWithEmail(email);

	if (!user) {
		throw new NotFoundError('Invalid email address or password provided');
	}

	if (user.password !== password) {
		throw new UnauthorizedError('Invalid password provided');
	}
	return user;
};
