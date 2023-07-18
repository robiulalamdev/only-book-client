import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getBooks: builder.mutation({
      query: ({ query }) => ({
        url: `/books?${query}`,
        method: 'GET',
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: 'DELETE'
      }),
    }),
    patchBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data
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

    postCreateBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books/`,
        method: 'POST',
        body: data,
      }),
    }),
    postReview: builder.mutation({
      query: ({ data }) => ({
        url: `/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),


    // book wishlist
    postWishlist: builder.mutation({
      query: ({ data }) => ({
        url: `/wishlist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getSignleWishlist: builder.query({
      query: ({ id, userId }) => `/wishlist/single/${id}/${userId}`,
      providesTags: ['wishlist'],
    }),
    getAllWishlist: builder.mutation({
      query: ({ userId, query }) => ({
        url: `/wishlist/${userId}/?${query}`,
        method: 'GET',
      }),
    }),
    patchWishlist: builder.mutation({
      query: ({ id, data }) => ({
        url: `/wishlist/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    getAllWishlistItems: builder.query({
      query: (userId) => `/wishlist/all/${userId}`,
      providesTags: ['wishlist'],
    }),

    deleteWishlist: builder.mutation({
      query: ({ id }) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['reviews'],
    }),

  }),
});

export const {
  useGetReviewsQuery,
  useGetBooksMutation,
  useDeleteBookMutation,
  usePatchBookMutation,
  usePostAllYearsByGenreMutation,
  useGetAllGenreQuery,
  useGetRecentlyBooksQuery,
  usePostCreateBookMutation,
  usePostReviewMutation,
  useGetSingleBookQuery,

  // book wishlist
  usePostWishlistMutation,
  useGetSignleWishlistQuery,
  useGetAllWishlistMutation,
  useGetAllWishlistItemsQuery,
  useDeleteWishlistMutation,
  usePatchWishlistMutation
} = productApi;
