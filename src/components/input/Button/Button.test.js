import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

test("Should display", () => {
  render(<Button text="Roar" />);
  expect(screen.getByText("Roar")).toBeInTheDocument();
});

test("Should click", () => {
  let onClick = jest.fn();
  render(<Button text="Roar" onButtonClick={onClick} />);
  for (let i = 0; i < 3; i++) {
    fireEvent.click(screen.getByText("Roar"));
  }
  expect(onClick).toHaveBeenCalledTimes(3);
});

test("Should show spinner when needed", () => {
  render(<Button text="Roar" loading={true} />);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});
