import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getBooks: builder.mutation({
      query: ({ query }) => ({
        url: `/books?${query}`,
        method: 'GET',
      }),
    }),
    getRecentlyBooks: builder.query({
      query: () => '/books',
    }),
    getAllGenre: builder.query({
      query: () => '/books/genries/all',
    }),

    postAllYearsByGenre: builder.mutation({
      query: ({ genre }) => ({
        url: `/books/publication/all/${genre}`,
        method: 'POST'
      }),
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
  useGetBooksMutation,
  usePostAllYearsByGenreMutation,
  useGetAllGenreQuery,
  useGetRecentlyBooksQuery,
  usePostCreateBookMutation,
  usePostCommentMutation,
  useSingleProductQuery,
} = productApi;
