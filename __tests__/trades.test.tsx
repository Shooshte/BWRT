import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { mockTrades } from "../src/lib/features/exchange/trades";
import Trades from "../src/app/components/trades";
import { round } from "../src/lib/utils";
import { Wrapper } from "../src/tests/test-utils";

describe("Trades", () => {
  test("Render correct DOM structure", () => {
    const { container } = render(<Trades />, { wrapper: Wrapper });
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("Render correct trades", () => {
    mockTrades.forEach(({ amount, id, price, timestamp, type }) => {
      it(`render trade ${id}`, () => {
        render(<Trades />, { wrapper: Wrapper });
        const trade = screen.getByTestId(`trade-${id}`);
        expect(trade).toBeInTheDocument();

        const roundedAmount = round(amount, 5);
        const roundedPrice = round(price * amount, 2);

        const value =
          type === "buy"
            ? `${roundedAmount} BTC / - ${roundedPrice} USD`
            : `- ${roundedAmount} BTC / + ${roundedPrice} USD`;
        const time = new Date(timestamp).toLocaleTimeString();

        expect(trade).toHaveTextContent(type);
        expect(trade).toHaveTextContent(value);
        expect(trade).toHaveTextContent(time);
      });
    });
  });
});
