import {
	getAllAvailableProductsOfUser,
	getAllLentProducts,
	getAllPurchasedProducts,
	getAllRentedProducts,
	getAllSoldProducts,
} from '../../models/product.model';
import { findUserWithId } from '../../models/user.model';

const resolvers = {
	Query: {
		getLoggedInUser: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const user = await findUserWithId(userId);
				return user;
			} else {
				throw new Error('User with id not found');
			}
		},
		getCreatedProducts: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const products = await getAllAvailableProductsOfUser(userId);
				return products;
			} else {
				throw new Error('User with id not found');
			}
		},
		getAllPurchasedProducts: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const products = await getAllPurchasedProducts(userId);
				return products;
			} else {
				throw new Error('User with id not found');
			}
		},
		getAllRentedProducts: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const products = await getAllRentedProducts(userId);
				return products;
			} else {
				throw new Error('User with id not found');
			}
		},
		getAllLentProducts: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const products = await getAllLentProducts(userId);
				return products;
			} else {
				throw new Error('User with id not found');
			}
		},
		getAllSoldProducts: async (parent: any, args: any, context: any) => {
			if (context && context.user) {
				const userId = context.user.id;
				const products = await getAllSoldProducts(userId);
				return products;
			} else {
				throw new Error('User with id not found');
			}
		},
	},
};

export default resolvers;
