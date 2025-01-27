import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loader from "../src/app/components/loader";

describe("Loader", () => {
  it("renders loading test", () => {
    render(<Loader />);
    const loader = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });
});
