import { prisma } from '../lib/prisma';
import { Product, ProductAvailabilityStatus } from '@prisma/client';
import { CreateEditProductPayloadType } from '../validators/product';

export const createProduct = async (
	productData: Omit<Product, 'id' | 'productAvailability' | 'creatorId'>,
	creatorId: string,
) => {
	return prisma.product.create({
		data: {
			...productData,
			productAvailability: 'AVAILABLE',
			creatorId,
		},
	});
};

export const updateProductDetails = async (
	productData: CreateEditProductPayloadType,
	productId: string,
	userId: string,
) => {
	return prisma.product.update({
		data: {
			...productData,
		},
		where: {
			id: productId,
			creatorId: userId,
		},
	});
};

export const deleteProductRecord = async (
	productId: string,
	userId: string,
) => {
	return prisma.product.delete({
		where: {
			id: productId,
			creatorId: userId,
			productAvailability: 'AVAILABLE',
		},
	});
};

export const findAvailableProductForPurchase = async (
	productId: string,
	productTitle: string,
) => {
	return prisma.product.findFirst({
		where: {
			id: productId,
			title: productTitle,
			NOT: { productAvailability: 'SOLD' },
		},
	});
};

export const updateProductAvailability = async (
	productId: string,
	availability: ProductAvailabilityStatus,
) => {
	return prisma.product.update({
		where: { id: productId },
		data: { productAvailability: availability },
	});
};

export const findAvailableProductForRent = async (
	productId: string,
	productTitle: string,
) => {
	return prisma.product.findFirst({
		where: {
			id: productId,
			title: productTitle,
			productAvailability: 'AVAILABLE',
		},
	});
};

export const createPurchaseRecord = async (
	productId: string,
	userId: string,
) => {
	return prisma.$transaction([
		prisma.purchaseProductRecord.create({
			data: {
				productId: productId,
				purchasedByUserId: userId,
			},
		}),
		prisma.product.update({
			where: { id: productId },
			data: { productAvailability: 'SOLD' },
		}),
	]);
};

export const getAvailableProductById = async (productId: string) => {
	return prisma.product.findUnique({
		where: {
			id: productId,
			productAvailability: 'AVAILABLE',
		},
	});
};

export const getAllPurchasedProducts = async (userId: string) => {
	return prisma.purchaseProductRecord.findMany({
		where: {
			purchasedByUserId: userId,
		},
		include: {
			product: true,
		},
	});
};

export const createProductRentalRecord = async ({
	productId,
	userId,
	rentedFrom,
	rentedTill,
}: {
	productId: string;
	userId: string;
	rentedFrom: string;
	rentedTill: string;
}) => {
	return prisma.$transaction([
		prisma.rentalProductRecord.create({
			data: {
				productId: productId,
				rentedByUserId: userId,
				rentedOn: rentedFrom,
				rentedTill: rentedTill,
			},
		}),
		prisma.product.update({
			where: { id: productId },
			data: { productAvailability: 'RENTED' },
		}),
	]);
};

export const getAllRentedProducts = async (userId: string) => {
	return prisma.rentalProductRecord.findMany({
		where: {
			rentedByUserId: userId,
		},
		include: {
			product: true,
		},
	});
};

export const getAllSoldProducts = async (userId: string) => {
	return prisma.purchaseProductRecord.findMany({
		where: {
			product: {
				creatorId: userId,
			},
		},
		include: {
			product: true,
		},
	});
};

export const getAllLentProducts = async (userId: string) => {
	return prisma.rentalProductRecord.findMany({
		where: {
			product: {
				creatorId: userId,
			},
		},
		include: {
			product: true,
		},
	});
};

export const getAllAvailableProductsOfUser = async (userId: string) => {
	return prisma.product.findMany({
		where: {
			creatorId: userId,
			productAvailability: 'AVAILABLE',
		},
	});
};

export const getAllAvailableProductsCreatedByOthers = async (
	userId: string,
) => {
	return prisma.product.findMany({
		where: {
			NOT: {
				creatorId: userId,
			},
			productAvailability: 'AVAILABLE',
		},
	});
};
