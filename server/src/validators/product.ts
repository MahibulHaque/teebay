import { Category, ProductRentalPeriod } from '@prisma/client';
import { z } from 'zod';

export const createProductValidationSchema = z.object({
	title: z.string(),
	description: z.string(),
	categories: z.nativeEnum(Category).array(),
	price: z.number(),
	rentalPrice: z.number(),
	rentalPeriod: z.nativeEnum(ProductRentalPeriod),
});

export type CreateEditProductPayloadType = z.infer<typeof createProductValidationSchema>

export const createProductPurchaseRecordValidationSchema = z.object({
	productId: z.string(),
	productTitle: z.string(),
});

export const createProductRentalRecordValidationSchema = z.object({
	productId: z.string(),
	productTitle: z.string(),
	rentedFrom: z.string().datetime(),
	rentedTill: z.string().datetime(),
});
