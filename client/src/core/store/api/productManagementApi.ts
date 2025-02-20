import {IBaseCommandResponse} from '@/core/interfaces/auth.interface';
import axiosBaseQuery from '@/core/services/axiosBaseQuery';
import {
  ICreateNewProductPayload,
  IDeleteProduct,
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
    deleteProduct: builder.mutation<IBaseCommandResponse, IDeleteProduct>({
      query: body => ({
        url: `delete-product/${body.productId}`,
        method: 'delete',
        data: body,
      }),
    }),
  }),
});

export const {useDeleteProductMutation, useCreateProductMutation} = productManagementApi;
