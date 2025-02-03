import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../src/tests/mock/api/server";
import { http, HttpResponse } from "msw";
import { store } from "../src/tests/test-utils";

import TradeModal from "../src/app/components/trade/tradeModal";
import { Wrapper } from "../src/tests/test-utils";

describe("TradeModal", () => {
  test("Render correct DOM elements", () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const { container } = render(<TradeModal onClose={() => {}} />, {
      wrapper: Wrapper,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Covert BTC to USD correctly", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await user.type(screen.getByLabelText("BTC"), "0.05");
    expect(screen.getByLabelText("USD")).toHaveValue("7,500");
  });

  test("Covert USD to BTC correctly", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await act(async () => {
      await user.type(screen.getByLabelText("USD"), "225");
    });
    expect(screen.getByLabelText("BTC")).toHaveValue("0.0015");
  });

  test("Display error when USD input is bigger than balance and user tries to buy", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await act(async () => {
      await user.type(screen.getByLabelText("USD"), "225.15");
      await user.click(screen.getByText("Buy"));
    });
    expect(screen.getByText("Insufficient funds!")).toBeInTheDocument();
  });

  test("Display error when BTC input is bigger than balance and user tries to sell", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await act(async () => {
      await user.type(screen.getByLabelText("BTC"), "0.11342279");
      await user.click(screen.getByText("Sell"));
    });
    expect(screen.getByText("Insufficient funds!")).toBeInTheDocument();
  });

  test("Display success message and updates global state when user buys BTC", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await act(async () => {
      await user.type(screen.getByLabelText("USD"), "225");
      await user.click(screen.getByText("Buy"));
    });
    expect(
      screen.getByText("Bought 0.0015 BTC for 225 USD.")
    ).toBeInTheDocument();

    waitFor(() => {
      const lastTrade = store.getState().exchange.trades.at(0);
      expect(lastTrade?.amount).toEqual(0.0015);
      expect(lastTrade?.price).toEqual(150000);
      expect(lastTrade?.type).toEqual("buy");

      const BTCBalance = store.getState().exchange.BTC;
      const USDBalance = store.getState().exchange.USD;

      expect(BTCBalance).toEqual(0.12342278);
      expect(USDBalance).toEqual(0.05);
    });
  });

  test("Display success message and updates global state when user sells BTC", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return HttpResponse.json({
          bitcoin: {
            usd: 150000,
            last_updated_at: 1738242795010,
          },
        });
      })
    );

    const user = userEvent.setup();

    render(<TradeModal onClose={() => {}} />, { wrapper: Wrapper });
    await act(async () => {
      await user.type(screen.getByLabelText("BTC"), "0.1");
      await user.click(screen.getByText("Sell"));
    });
    expect(
      screen.getByText("Sold 0.1 BTC for 15,000 USD.")
    ).toBeInTheDocument();

    waitFor(() => {
      const lastTrade = store.getState().exchange.trades.at(0);
      expect(lastTrade?.amount).toEqual(0.1);
      expect(lastTrade?.price).toEqual(150000);
      expect(lastTrade?.type).toEqual("sell");
      expect(store.getState().exchange.BTC).toEqual(0.01492278);
      expect(store.getState().exchange.USD).toEqual(15225.05);
    });
  });

  test("Call on close when user clicks close button", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<TradeModal onClose={onClose} />, { wrapper: Wrapper });
    await user.click(screen.getByTestId("trade-modal-close"));
    expect(onClose).toHaveBeenCalled();
  });
  // call dispatch on sell
});
