import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PasswordReset } from "./PasswordReset";

test("Should not submit if two passwords are different", () => {
  const onReset = jest.fn();
  render(<PasswordReset onReset={onReset} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: "BlueBear" },
  });
  fireEvent.change(screen.queryByLabelText("Confirm new password"), {
    target: { value: "BlueBear2008" },
  });
  fireEvent.click(screen.queryByText("Reset password"));
  expect(onLogin).toHaveBeenCalledTimes(0);
  expect(screen.queryByText("Passwords are different")).toBeInTheDocument();
});

test("Should reset password", () => {
  const onReset = jest.fn();
  render(<PasswordReset onReset={onReset} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: "BlueBear" },
  });
  fireEvent.change(screen.queryByLabelText("Confirm new password"), {
    target: { value: "BlueBear" },
  });
  fireEvent.click(screen.queryByText("Reset password"));
  expect(onLogin).toHaveBeenCalledTimes(1);
});

test("Should show reset error and not submit twice", () => {
  const onReset = jest.fn(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject("Roar"), 5000);
    });
  });
  render(<PasswordReset onReset={onReset} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: "BlueBear" },
  });
  fireEvent.change(screen.queryByLabelText("Confirm new password"), {
    target: { value: "BlueBear" },
  });
  fireEvent.click(screen.queryByText("Reset password"));
  fireEvent.click(screen.queryByText("Reset password"));
  fireEvent.click(screen.queryByText("Reset password"));
  expect(onReset).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    expect(screen.queryByText("Roar")).toBeInTheDocument();
    fireEvent.click(screen.queryByText("Reset password"));
    expect(onReset).toHaveBeenCalledTimes(2);
  }, 5000);
});
