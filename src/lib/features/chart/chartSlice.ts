import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CurrencyKey = "BTC" | "ETH";

export interface ChartState {
  currency: CurrencyKey;
  fetching: boolean;
}

const initialState: ChartState = {
  currency: "BTC",
  fetching: false,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyKey>) => {
      state.currency = action.payload;
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
  },
});

export const { setCurrency, setFetching } = chartSlice.actions;
export default chartSlice.reducer;
