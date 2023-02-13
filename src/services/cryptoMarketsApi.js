import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoMarketsHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'coinlore-cryptocurrency.p.rapidapi.com'
};

const createRequest = (url) => ({ url, params: {id: '90'}, headers: cryptoMarketsHeaders });

export const cryptoMarketsApi = createApi({
  reducerPath: 'cryptoMarketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coinlore-cryptocurrency.p.rapidapi.com/api/coin/markets/'}),
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: () => createRequest(''),
    }),
  }),
});

export const { useGetMarketsQuery } = cryptoMarketsApi;
