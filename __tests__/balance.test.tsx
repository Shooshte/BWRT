import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Balance from "../src/app/components/topBar/balance";
import { Wrapper } from "../src/tests/test-utils";

describe("Balance", () => {
  test("Render state balance", async () => {
    render(<Balance />, { wrapper: Wrapper });
    const BTCBalance = await screen.getByText(
      (_, element) => element?.textContent === "0.11342278 BTC"
    );
    expect(BTCBalance).toBeInTheDocument();
    const USDBalance = await screen.getByText(
      (_, element) => element?.textContent === "225.05 $"
    );
    expect(USDBalance).toBeInTheDocument();
    const AvailableText = await screen.getByText("Available");
    expect(AvailableText).toBeInTheDocument();
  });

  test("Render correct dom structure", () => {
    const { container } = render(
      <div style={{ height: "100%", width: "100%" }}>
        <Balance />
      </div>,
      { wrapper: Wrapper }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
