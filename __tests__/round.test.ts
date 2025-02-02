import { round } from "../src/lib/utils";

const TEST_CASES = [
  {
    expected: 1.23,
    input: [1.23456789, 2],
  },
  {
    expected: 0.00451,
    input: [0.004509432, 5],
  },
  {
    expected: 1.01,
    input: [1.005, 2],
  },
];

describe("round", () => {
  TEST_CASES.forEach(({ expected, input }) => {
    it(`should round ${input[0]} to ${expected} with ${input[1]} decimals`, () => {
      expect(round(input[0], input[1])).toBe(expected);
    });
  });
});
