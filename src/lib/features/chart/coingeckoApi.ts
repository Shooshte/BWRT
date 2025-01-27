import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coingeckoApi = createApi({
  reducerPath: "coingeckoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dsa.com/api/v3",
  }),
  endpoints: (builder) => ({
    pingApi: builder.query<string, void>({
      query: () => "/ping",
    }),
  }),
});

export const { usePingApiQuery } = coingeckoApi;
