import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ForgotPassword } from "./ForgotPassword";

const onSubmit = jest.fn();

beforeEach(() => {
  onSubmit.mockClear();
});

test("Should submit form", () => {
  render(<ForgotPassword onSubmit={onSubmit} />);
  fireEvent.change(screen.queryByLabelText("Password recovery email"), {
    target: { value: "oasis4@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Continue"));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ email: "oasis4@uwe.ac.uk" });
});

test("Should not submit empty form", () => {
  render(<ForgotPassword onSubmit={onSubmit} />);
  fireEvent.click(screen.queryByText("Continue"));
  expect(onSubmit).toHaveBeenCalledTimes(0);
  expect(
    screen.queryByText("cannot be empty", { exact: false })
  ).toBeInTheDocument();
});

test("Should go back to login page", () => {
  const onBack = jest.fn();
  render(<ForgotPassword onBack={onBack} />);
  fireEvent.click(screen.queryByText("Back"));
  expect(onBack).toHaveBeenCalledTimes(1);
});
