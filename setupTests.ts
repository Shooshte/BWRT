import "@testing-library/jest-dom";
import { server } from "./src/tests/mock/api/server";
import { coingeckoApi } from "./src/lib/features/chart/coingeckoApi";
import { store } from "./src/tests/test-utils";
import "cross-fetch/polyfill";
import { act } from "@testing-library/react";

// Mock the ResizeObserver
const ResizeObserverMock = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Stub the global ResizeObserver
global.ResizeObserver = ResizeObserverMock;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  act(() => {
    server.resetHandlers();
    store.dispatch(coingeckoApi.util.resetApiState());
  });
});

afterAll(() => server.close());
