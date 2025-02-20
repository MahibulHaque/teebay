import { GraphQLError } from 'graphql';
import { findUserWithId } from '../../models/user.model';
import { getAllAvailableProductsOfUser, getAllLentProducts, getAllPurchasedProducts, getAllRentedProducts, getAllSoldProducts, getAvailableProductById } from '../../models/product.model';

// Helper function to check authentication
const checkAuth = (context: any) => {
  if (!context?.user?.id) {
    throw new GraphQLError('Authentication required', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      },
    });
  }
  return context.user.id;
};

const resolvers = {
  Query: {
    getLoggedInUser: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      const user = await findUserWithId(userId);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'NOT_FOUND',
            http: { status: 404 }
          },
        });
      }
      
      return user;
    },

    getCreatedProducts: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      try {
        const products = await getAllAvailableProductsOfUser(userId);
        return products;
      } catch (error) {
        throw new GraphQLError('Failed to fetch created products', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },

    getAllPurchasedProducts: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      try {
        const products = await getAllPurchasedProducts(userId);
        return products;
      } catch (error) {
        throw new GraphQLError('Failed to fetch purchased products', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },

    getAllRentedProducts: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      try {
        const products = await getAllRentedProducts(userId);
        return products;
      } catch (error) {
        throw new GraphQLError('Failed to fetch rented products', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },

    getAllLentProducts: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      try {
        const products = await getAllLentProducts(userId);
        return products;
      } catch (error) {
        throw new GraphQLError('Failed to fetch lent products', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },

    getAllSoldProducts: async (_: any, __: any, context: any) => {
      const userId = checkAuth(context);
      
      try {
        const products = await getAllSoldProducts(userId);
        return products;
      } catch (error) {
        throw new GraphQLError('Failed to fetch sold products', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },
    getCreatedProductById: async (_: any, {id}: {id:string}, context: any) => {
      checkAuth(context);
      
      try {
        const product = await getAvailableProductById(id);
        return product;
      } catch (error) {
        throw new GraphQLError('Failed to fetch product detail', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 },
            originalError: error
          },
        });
      }
    },
  },
};

export default resolvers;