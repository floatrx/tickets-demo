import { API_BASE_URL, TAG_TYPES } from '@/config/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';

/**
 * Base query with custom header
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL, // @see vite.config.ts server.proxy
  paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
});

/*
 * Define a service using app URL and expected endpoints
 * Enhance generated endpoints with tags: providesTags & invalidatesTags
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
 * More at: https://www.graphql-code-generator.com/plugins/typescript-rtk-query
 */
export const api = createApi({
  reducerPath: '_api',
  tagTypes: TAG_TYPES,
  refetchOnReconnect: true, // test it
  refetchOnFocus: true, // test it
  baseQuery,
  endpoints: () => ({}),
});
