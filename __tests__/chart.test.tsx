import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { server } from "../src/tests/mock/api/server";
import { http, HttpResponse } from "msw";

import Chart from "../src/app/components/chart";
import { Wrapper } from "../src/tests/test-utils";

describe("Chart", () => {
  it("renders Error message when request fails", async () => {
    server.use(
      http.get("/ping", async () => {
        return new HttpResponse("Internal server error", { status: 500 });
      })
    );

    render(<Chart />, { wrapper: Wrapper });
    const errorMessage = await screen.findByText("Unable to load coin data.");
    expect(errorMessage).toBeInTheDocument();
  });
});
