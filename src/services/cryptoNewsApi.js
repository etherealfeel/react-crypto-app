import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const {REACT_APP_RAPIDAPI_KEY, REACT_APP_NEWS_HOST, REACT_APP_NEWS_URL} = process.env;

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': REACT_APP_NEWS_HOST
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_NEWS_URL}),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count}) => createRequest(`/news/${newsCategory}/${count}`),
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
