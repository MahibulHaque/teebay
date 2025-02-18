import {
  IBaseCommandResponse,
  IBaseQueryResponse,
  ICreateUserPayload,
  IGetLoggedInUser,
  ILoginUserPayload,
} from '@/core/interfaces/auth.interface';
import axiosBaseQuery from '@/core/services/axiosBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({baseUrl: '/auth/'}),
  tagTypes: ['user'],
  endpoints: builder => ({
    loggedInUserInfo: builder.query<IBaseQueryResponse<IGetLoggedInUser>,void>({
      query: () => ({url: 'loggedInUser', method: 'get'}),
      providesTags:['user']
    }),
    createUser: builder.mutation<IBaseCommandResponse, ICreateUserPayload>({
      query: body => ({
        url: 'signup',
        method: 'post',
        data: body,
      }),
    }),
    loginUser: builder.mutation<IBaseCommandResponse, ILoginUserPayload>({
      query: body => ({
        url: 'signin',
        method: 'post',
        data: body,
      }),
    }),
    logoutUser:builder.mutation<IBaseCommandResponse, void>({
      query: body => ({
        url: 'logout',
        method: 'post',
        data: body,
      }),
    })
  }),
});

export const {useLoggedInUserInfoQuery,useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation} = userApi;
