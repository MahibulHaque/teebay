import { z } from 'zod';

export const userLoginValidationSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const userSignupValidationSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string(),
	address: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});
