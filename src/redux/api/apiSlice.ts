import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hostapi = 'https://only-book.onrender.com/api/v1'
const localapi = "http://localhost:5000/api/v1"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: localapi }),
  tagTypes: ['reviews'],
  endpoints: () => ({}),
});
