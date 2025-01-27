import "@testing-library/jest-dom";
import { server } from "./src/tests/mock/api/server";
import { coingeckoApi } from "./src/lib/features/chart/coingeckoApi";
import { makeStore } from "./src/lib/store";
// import { enableFetchMocks } from "jest-fetch-mock";
import "cross-fetch/polyfill";

//enableFetchMocks();

const store = makeStore();

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(coingeckoApi.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
