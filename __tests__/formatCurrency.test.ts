import { formatCurrency } from "../src/lib/utils";

const TEST_CASES = [
  {
    expected: "5",
    input: 5,
  },
  {
    expected: "0.00321423",
    input: 0.00321423,
  },
  {
    expected: "24.521525151",
    input: 24.521525151,
  },
  {
    expected: "124,5.01",
    input: 1245.01,
  },
  {
    expected: "124,525.01",
    input: 124525.01,
  },
  {
    expected: "124,525,52.01",
    input: 12452552.01,
  },
];

describe("formatCurrency", () => {
  TEST_CASES.forEach(({ expected, input }) => {
    it(`should format ${input} to ${expected}`, () => {
      expect(formatCurrency(input)).toBe(expected);
    });
  });
});
