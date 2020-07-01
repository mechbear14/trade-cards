import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "./Loading";

test("should render", () => {
  render(<Loading />);
  expect(screen.getByText("Loading")).toBeInTheDocument();
});
