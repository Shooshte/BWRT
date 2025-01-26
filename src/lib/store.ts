import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./features/chart/chartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chart: chartReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
