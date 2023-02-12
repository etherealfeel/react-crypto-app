import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://crypto-news16.p.rapidapi.com'}),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count}) => createRequest(`/news/${newsCategory}/${count}`),
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
