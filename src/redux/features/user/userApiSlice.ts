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
    }),
});

export const {
    usePostCreateUserMutation,
    usePostLoginUserMutation,
} = userApi;
