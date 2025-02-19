import { NextFunction, Request, Response } from 'express';
import {
	createProductPurchaseRecordValidationSchema,
	createProductRentalRecordValidationSchema,
	createProductValidationSchema,
} from '../validators/product';
import { decodeAccessToken } from '../services/token.service';
import {
	addNewProduct,
	purchaseProduct,
	rentProduct,
} from '../services/product.service';

export const createProductController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { accessToken } = req.cookies;
		const userId = decodeAccessToken(accessToken).id;
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
		const userId = decodeAccessToken(accessToken).id;
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
		const userId = decodeAccessToken(accessToken).id;
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
