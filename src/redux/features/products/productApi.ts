import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (options) => `/books?${options}`,
    }),
    getRecentlyBooks: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getComment: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  useGetRecentlyBooksQuery,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
