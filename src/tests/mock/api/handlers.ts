import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.coingecko.com/api/v3/ping", () => {
    return HttpResponse.json("Server is working.");
  }),
  http.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
    () => {
      return HttpResponse.json({
        prices: [],
        market_caps: [],
        total_volumes: [],
      });
    }
  ),
];
