import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

export interface HistoricalData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

const historicalDataSchema = z.object({
  prices: z.array(z.array(z.number())),
  market_caps: z.array(z.array(z.number())),
  total_volumes: z.array(z.array(z.number())),
});

interface HistoricalDataParams {
  coinID: string;
  days: number;
  interval?: string;
  precision?: string;
  vs_currency: string;
}

export interface CoinPrice {
  bitcoin: {
    usd: number;
    last_updated_at: number;
  };
}

const coinPriceSchema = z.object({
  bitcoin: z.object({
    usd: z.number(),
    last_updated_at: z.number(),
  }),
});

interface CoinPriceParams {
  ids: "bitcoin";
  vs_currencies: "usd";
  include_market_cap?: boolean;
  include_24hr_vol?: boolean;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
  precision?: number;
}

export const coingeckoApi = createApi({
  reducerPath: "coingeckoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
    headers: process.env.COINGECKO_API_KEY
      ? {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        }
      : undefined,
  }),
  endpoints: (builder) => ({
    getHistoricalData: builder.query<HistoricalData, HistoricalDataParams>({
      query: ({ coinID, ...rest }) => ({
        url: `/coins/${coinID}/market_chart`,
        method: "GET",
        params: rest,
      }),
      transformResponse: (response: HistoricalData) => {
        historicalDataSchema.parse(response);
        return response;
      },
    }),
    getCoinPrice: builder.query<CoinPrice, CoinPriceParams>({
      query: ({ ...params }) => ({
        url: `/simple/price`,
        method: "GET",
        params: params,
      }),
      transformResponse: (response: CoinPrice) => {
        coinPriceSchema.parse(response);
        return response;
      },
    }),
  }),
});

// https://api.coingecko.com/api/v3/api/simple.price?ids=bitcoin&vs_currencies=usd&precision=2

// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2

export const { useGetCoinPriceQuery, useGetHistoricalDataQuery } = coingeckoApi;
