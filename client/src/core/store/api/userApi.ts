import {
  ICreateUserPayload,
  ILoginUserPayload,
  IResponse,
} from '@/core/interfaces/auth.interface';
import axiosBaseQuery from '@/core/services/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({baseUrl: '/'}),
  tagTypes: ['user'],
  endpoints: builder => ({
    createUser: builder.mutation<IResponse, ICreateUserPayload>({
      query: body => ({
        url: 'signup',
        method: 'post',
        data: body,
      }),
    }),
    loginUser: builder.mutation<IResponse, ILoginUserPayload>({
      query: body => ({
        url: 'login',
        method: 'post',
        data: body,
      }),
    }),
  }),
});

export const {useCreateUserMutation, useLoginUserMutation} = userApi;
