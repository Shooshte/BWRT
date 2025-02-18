import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import exchangeReducer from "./features/exchange/exchangeSlice";
import { coingeckoApi } from "./features/chart/coingeckoApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      exchange: exchangeReducer,
      [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coingeckoApi.middleware),
  });
};

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
