import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (options) => `/books?${options}`,
    }),
    getRecentlyBooks: builder.query({
      query: () => '/books',
    }),
    getAllGenre: builder.query({
      query: () => '/books/genries/all',
    }),
    singleProduct: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postCreateBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books/`,
        method: 'POST',
        body: data,
      }),
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
  useGetAllGenreQuery,
  useGetRecentlyBooksQuery,
  usePostCreateBookMutation,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
