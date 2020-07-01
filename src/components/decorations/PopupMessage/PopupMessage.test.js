import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import PopupMessage from "./PopupMessage";

const message = "Are you sure you want to delete?";
const validateLabel = "Reason";

test("Should not render text input if no validation", () => {
  render(<PopupMessage message={message} />);
  expect(screen.getByText(message)).toBeInTheDocument();
  expect(screen.queryByTestId("message-input")).not.toBeInTheDocument();
});

test("Should render text input if there's validation", () => {
  const onValidate = jest.fn(() => true);
  const validateLabel = "Reason";
  render(
    <PopupMessage
      message={message}
      validateLabel={validateLabel}
      onValidate={onValidate}
    />
  );
  expect(screen.queryByTestId("message-input")).toBeInTheDocument();
});

test("Should call onConfirm if valid", () => {
  const onValidate = jest.fn(() => true);
  const onConfirm = jest.fn();
  render(
    <PopupMessage
      message={message}
      validateLabel={validateLabel}
      onValidate={onValidate}
      onConfirm={onConfirm}
    />
  );
  fireEvent.change(screen.getByLabelText(validateLabel), {
    target: { value: "Don't know" },
  });
  fireEvent.click(screen.getByText("Confirm action"));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test("Should not call onConfirm if invalid", () => {
  const onValidate = jest.fn(() => false);
  const onConfirm = jest.fn();
  render(
    <PopupMessage
      message={message}
      validateLabel={validateLabel}
      onValidate={onValidate}
      onConfirm={onConfirm}
    />
  );
  fireEvent.click(screen.getByText("Confirm action"));
  expect(onConfirm).toHaveBeenCalledTimes(0);
});

test("Should abort the action if clicked close", () => {
  const onAbort = jest.fn();
  render(<PopupMessage message={message} onAbort={onAbort} />);
  fireEvent.click(screen.getByTestId("message-close"));
  expect(onAbort).toHaveBeenCalledTimes(1);
});

test("Should abort the action if clicked outside the box", () => {
  const onAbort = jest.fn();
  render(<PopupMessage message={message} onAbort={onAbort} />);
  fireEvent.click(screen.getByTestId("message-background"));
  expect(onAbort).toHaveBeenCalledTimes(1);
});
