import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

interface HistoricalData {
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
    pingApi: builder.query<string, void>({
      query: () => "/ping",
    }),
    getHistoricalData: builder.query<HistoricalData, HistoricalDataParams>({
      query: ({ coinID, ...rest }) => ({
        url: `/coins/${coinID}/market_chart`,
        method: "GET",
        params: { ...rest },
      }),
      transformResponse: (response: HistoricalData) => {
        console.log("transformResponse response: ", response);

        historicalDataSchema.parse(response);
        return response;
      },
    }),
  }),
});

export const { useGetHistoricalDataQuery, usePingApiQuery } = coingeckoApi;
