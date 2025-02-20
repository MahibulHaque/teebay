import {IBaseCommandResponse} from '@/core/interfaces/auth.interface';
import axiosBaseQuery from '@/core/services/axiosBaseQuery';
import {
  ICreateNewProductPayload,
  ICreateProductPurchaseRecordPayload,
  ICreateProductRentalRecordPayload,
  IDeleteProduct,
  IEditProductPayload,
} from '@/modules/product-management/interfaces/product.interface';
import {createApi} from '@reduxjs/toolkit/query/react';

export const productManagementApi = createApi({
  reducerPath: 'productManagementApi',
  baseQuery: axiosBaseQuery({baseUrl: '/product-management/'}),
  tagTypes: ['product'],
  endpoints: builder => ({
    createProduct: builder.mutation<
      IBaseCommandResponse,
      ICreateNewProductPayload
    >({
      query: body => ({
        url: `create-product`,
        method: 'post',
        data: body,
      }),
    }),
    updateProduct: builder.mutation<IBaseCommandResponse, IEditProductPayload>({
      query: body => ({
        url: `update-product/${body.productId}`,
        method: 'put',
        data: body,
      }),
    }),
    deleteProduct: builder.mutation<IBaseCommandResponse, IDeleteProduct>({
      query: body => ({
        url: `delete-product/${body.productId}`,
        method: 'delete',
        data: body,
      }),
    }),
    createProductPurchaseRecord: builder.mutation<
      IBaseCommandResponse,
      ICreateProductPurchaseRecordPayload
    >({
      query: body => ({
        url: 'create-purchase-record',
        method: 'post',
        data: body,
      }),
    }),
    createProductRentalRecord: builder.mutation<
      IBaseCommandResponse,
      ICreateProductRentalRecordPayload
    >({
      query: body => ({
        url: 'create-rental-record',
        method: 'post',
        data: body,
      }),
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateProductPurchaseRecordMutation,
  useCreateProductRentalRecordMutation,
} = productManagementApi;
