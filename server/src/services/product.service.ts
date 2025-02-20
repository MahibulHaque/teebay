import {
	createProduct,
	createProductRentalRecord,
	createPurchaseRecord,
	deleteProductRecord,
	findAvailableProductForPurchase,
	findAvailableProductForRent,
	updateProductAvailability,
	updateProductDetails,
} from '../models/product.model';
import { CustomError } from '../utils/error';
import { CreateEditProductPayloadType } from '../validators/product';

export const addNewProduct = async (productData: any, userId: string) => {
	return createProduct(productData, userId);
};

export const purchaseProduct = async (
	productId: string,
	productTitle: string,
	userId: string,
) => {
	const product = await findAvailableProductForPurchase(
		productId,
		productTitle,
	);
	if (!product) {
		throw new CustomError('Requested product is not available for sale', 400);
	}

	if (product.productAvailability === 'AVAILABLE') {
		await createPurchaseRecord(product.id, userId);
	} else if (product.productAvailability === 'RENTED') {
		await updateProductAvailability(product.id, 'PENDING_SALE');
	}

	return product.productAvailability === 'RENTED'
		? 'Lented product purchase successful'
		: 'Product purchase successful';
};

export const rentProduct = async ({
	productId,
	productTitle,
	userId,
	rentedFrom,
	rentedTill,
}: {
	productId: string;
	productTitle: string;
	userId: string;
	rentedFrom: string;
	rentedTill: string;
}) => {
	const product = await findAvailableProductForRent(productId, productTitle);
	if (!product) {
		throw new CustomError('Requested product is not available for sale', 400);
	}

	await createProductRentalRecord({
		productId,
		userId,
		rentedFrom,
		rentedTill,
	});
};

export const updateProduct = async (updatedProductDetails: CreateEditProductPayloadType, productId:string, userId:string) => {
	await updateProductDetails(updatedProductDetails, productId, userId)
};

export const deleteProduct = async (productId:string, userId:string)=>{
	await deleteProductRecord(productId, userId)
}