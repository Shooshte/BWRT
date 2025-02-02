import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { server } from "../src/tests/mock/api/server";
import { http, HttpResponse } from "msw";

import Chart from "../src/app/components/chart";
import { Wrapper } from "../src/tests/test-utils";

describe("Chart Container", () => {
  test("render error message when getHistoricalData request fails", async () => {
    server.use(
      http.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
        () => {
          return new HttpResponse(null, { status: 500 });
        }
      )
    );

    render(<Chart />, { wrapper: Wrapper });
    const errorMessage = await screen.findByText("Unable to load coin price.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("render error message when getHistoricalData request returns invalid data", async () => {
    server.use(
      http.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
        () => {
          return HttpResponse.json({});
        }
      )
    );

    render(<Chart />, { wrapper: Wrapper });
    const errorMessage = await screen.findByText("Unable to load coin price.");
    expect(errorMessage).toBeInTheDocument();
  });
});
