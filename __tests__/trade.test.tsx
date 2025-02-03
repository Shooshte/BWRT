import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../src/tests/mock/api/server";
import { http, HttpResponse } from "msw";

import Trade from "../src/app/components/trade";
import { Wrapper } from "../src/tests/test-utils";

describe("Trade", () => {
  test("Disable trade button when the price request fails", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/simple/price", () => {
        return new HttpResponse("", { status: 500 });
      })
    );

    render(<Trade />, { wrapper: Wrapper });
    expect(screen.getByText("Trade")).toBeDisabled();
  });

  test("Enable trade button when the price request succeeds", async () => {
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

    render(<Trade />, { wrapper: Wrapper });
    await waitFor(async () => {
      expect(screen.getByText("Trade")).not.toBeDisabled();
    });
  });

  test("Open trade modal when trade button is clicked", async () => {
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

    render(<Trade />, { wrapper: Wrapper });
    await waitFor(async () => {
      expect(screen.getByText("Trade")).not.toBeDisabled();
      screen.getByText("Trade").click();
      expect(screen.getByTestId("trade-modal")).toBeInTheDocument();
    });
  });
});
