import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const {REACT_APP_RAPIDAPI_KEY, REACT_APP_MARKETS_HOST, REACT_APP_MARKETS_URL} = process.env;

const cryptoMarketsHeaders = {
  'X-RapidAPI-Key': REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': REACT_APP_MARKETS_HOST
};

const createRequest = (url) => ({ url, params: {id: '90'}, headers: cryptoMarketsHeaders });

export const cryptoMarketsApi = createApi({
  reducerPath: 'cryptoMarketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_MARKETS_URL}),
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: () => createRequest(''),
    }),
  }),
});

export const { useGetMarketsQuery } = cryptoMarketsApi;
