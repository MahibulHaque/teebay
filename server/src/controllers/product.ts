import { NextFunction, Request, Response } from 'express';
import {
	createProductPurchaseRecordValidationSchema,
	createProductRentalRecordValidationSchema,
	createProductValidationSchema,
} from '../validators/product';
import {
	addNewProduct,
	purchaseProduct,
	rentProduct,
} from '../services/product.service';
import {
	ICreateTokenPayload,
	verifyAccessToken,
} from '../services/token.service';

export const createProductController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { accessToken } = req.cookies;
		const { id: userId } = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;
		const productData = createProductValidationSchema.parse(req.body);

		await addNewProduct(productData, userId);

		res.status(201).json({
			status: 'success',
			message: 'New product created successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const createPurchaseRecordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { accessToken } = req.cookies;
		const { id: userId } = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;
		const { productId, productTitle } =
			createProductPurchaseRecordValidationSchema.parse(req.body);

		const message = await purchaseProduct(productId, productTitle, userId);

		res.status(201).json({ status: 'success', message });
	} catch (error) {
		next(error);
	}
};

export const createRentalRecordController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { accessToken } = req.cookies;
		const { id: userId } = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;
		const product = createProductRentalRecordValidationSchema.parse(req.body);
		await rentProduct({ ...product, userId });

		res.status(200).json({
			status: 'success',
			message: 'Product rented successfully',
		});
	} catch (error) {
		next(error);
	}
};
