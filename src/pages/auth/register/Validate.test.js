import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Validate } from "./Validate";

test("Should display callSign and Today", () => {
  render(<Validate callSign={"ThunderBear"} />);
  expect(
    screen.queryByText("ThunderBear", { exact: false })
  ).toBeInTheDocument();
  expect(screen.queryByText("dashboard", { exact: false })).toBeInTheDocument();
});

test("Should display invalid id if fails", () => {
  render(<Validate />);
  expect(screen.queryByText("invalid", { exact: false })).toBeInTheDocument();
});
