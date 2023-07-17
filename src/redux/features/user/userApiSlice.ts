import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        postCreateUser: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        postLoginUser: builder.mutation({
            query: ({ data }) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
        }),
        getUserInfo: builder.mutation({
            query: ({ token }) => ({
                url: `/auth/info`,
                method: 'POST',
                headers: {
                    "Authorization": `${token}`
                },
            }),
        }),
    }),
});

export const {
    usePostCreateUserMutation,
    usePostLoginUserMutation,
    useGetUserInfoMutation
} = userApi;
