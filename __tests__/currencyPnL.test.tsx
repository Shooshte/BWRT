import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../src/tests/mock/api/server";
import { http, HttpResponse } from "msw";

import CurrencyPnL from "../src/app/components/topBar/currencyPnL";
import { Wrapper } from "../src/tests/test-utils";

describe("Currency PnL", () => {
  test("Displays the correct currency name, price and profit/loss", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000.12,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    render(<CurrencyPnL />, { wrapper: Wrapper });

    await waitFor(async () => {
      expect(screen.getByText("BTC")).toBeInTheDocument();
      expect(screen.getByText("150,000.12 $")).toBeInTheDocument();
      expect(screen.getByText("+ 760.59")).toBeInTheDocument();
    });
  });

  test("Render correct DOM structure", async () => {
    const { container } = render(<CurrencyPnL />, { wrapper: Wrapper });
    expect(container.firstChild).toMatchSnapshot();
  });
});
