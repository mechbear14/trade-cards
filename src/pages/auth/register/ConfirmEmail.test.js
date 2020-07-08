import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ConfirmEmail } from "./ConfirmEmail";

const onResend = jest.fn();

beforeEach(() => {
  onResend.mockClear();
});

test("Should resend email", () => {
  render(<ConfirmEmail onResend={onResend} />);
  fireEvent.click(screen.queryByText("Resend email"));
  expect(onResend).toHaveBeenCalledTimes(1);
});

test("Should not resend email twice within one minute", () => {
  render(<ConfirmEmail onResend={onResend} />);
  fireEvent.click(screen.queryByText("Resend email"));
  fireEvent.click(screen.queryByText("Resend email"));
  fireEvent.click(screen.queryByText("Resend email"));
  fireEvent.click(screen.queryByText("Resend email"));
  expect(onResend).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    fireEvent.click(screen.queryByText("Resend email"));
    expect(onResend).toHaveBeenCalledTimes(2);
  }, 60000);
});
