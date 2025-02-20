import { NextFunction, Request, Response } from 'express';
import {
	createProductPurchaseRecordValidationSchema,
	createProductRentalRecordValidationSchema,
	createProductValidationSchema,
} from '../validators/product';
import {
	addNewProduct,
	deleteProduct,
	purchaseProduct,
	rentProduct,
	updateProduct,
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

export const updateProductDetailsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const updateProductPayload = createProductValidationSchema.parse(
			req.body,
		);

		const productId = req.params.productId;
		const { accessToken } = req.cookies;
		const { id: userId } = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;

		await updateProduct(updateProductPayload, productId, userId);

		res.status(200).json({
			status: 'success',
			message: 'Product details updated successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteProductController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const productId = req.params.productId;
		const { accessToken } = req.cookies;
		const { id: userId } = verifyAccessToken(
			accessToken,
		) as ICreateTokenPayload;
		await deleteProduct(productId, userId);

		res.status(200).json({
			status: 'success',
			message: `Product deleted successfully`,
		});
	} catch (error) {
		next(error);
	}
};
