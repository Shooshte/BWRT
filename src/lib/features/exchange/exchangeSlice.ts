import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { mockTrades } from "./trades";

export interface Trade {
  amount: number;
  id: string;
  price: number;
  timestamp: number;
  type: "buy" | "sell";
}

interface ChartState {
  BTC: number;
  USD: number;
  trades: Trade[];
}

const initialState: ChartState = {
  BTC: 0.11342278,
  USD: 225.05,
  trades: mockTrades,
};

export const chartSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades = [action.payload, ...state.trades];
    },
    setBTC: (state, action: PayloadAction<number>) => {
      state.BTC = action.payload;
    },
    setUSD: (state, action: PayloadAction<number>) => {
      state.USD = action.payload;
    },
  },
});

export const { addTrade, setBTC, setUSD } = chartSlice.actions;
export default chartSlice.reducer;
