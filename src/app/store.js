import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from '../services/cryptoApi';
import { cryptoMarketsApi } from "../services/cryptoMarketsApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoMarketsApi.reducerPath]: cryptoMarketsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware, cryptoMarketsApi.middleware)
})