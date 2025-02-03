import { formatCurrency } from "../src/lib/utils";

const TEST_CASES = [
  {
    expected: "-5",
    input: -5,
  },
  {
    expected: "-565,423.59",
    input: -565423.59,
  },
  {
    expected: "0",
    input: 0,
  },
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
    expected: "-7,500",
    input: -7500,
  },
  {
    expected: "7,500",
    input: 7500,
  },
  {
    expected: "1,245.01",
    input: 1245.01,
  },
  {
    expected: "124,525.01",
    input: 124525.01,
  },
  {
    expected: "12,452,552.01",
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
