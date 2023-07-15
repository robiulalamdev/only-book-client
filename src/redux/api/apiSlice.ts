import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://only-book.onrender.com/api/v1' }),
  tagTypes: ['reviews'],
  endpoints: () => ({}),
});
