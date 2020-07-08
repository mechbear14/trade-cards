import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ResetPassword } from "./ResetPassword";

const onSubmit = jest.fn();

beforeEach(() => {
  onSubmit.mockClear();
});

test("Should submit password", () => {
  const password = "test1234";
  const passwordAgain = "test1234";
  render(<ResetPassword uid={"1234"} onSubmit={onSubmit} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: password },
  });
  fireEvent.change(screen.queryByLabelText("New password again"), {
    target: { value: passwordAgain },
  });
  fireEvent.click(screen.queryByText("Submit"));
  expect(onSubmit).toHaveBeenCalledWith({ newPassword: password });
});

test("Should not submit incomplete form", () => {
  const password = "test1234";
  render(<ResetPassword uid={"1234"} onSubmit={onSubmit} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: password },
  });
  fireEvent.click(screen.queryByText("Submit"));
  expect(onSubmit).toHaveBeenCalledTimes(0);
  expect(
    screen.queryByText("cannot be blank", { exact: false })
  ).toBeInTheDocument();
});

test("Should not submit if two passwords don't match", () => {
  const password = "test1234";
  const passwordAgain = "test1234";
  render(<ResetPassword uid={"1234"} onSubmit={onSubmit} />);
  fireEvent.change(screen.queryByLabelText("New password"), {
    target: { value: password },
  });
  fireEvent.change(screen.queryByLabelText("New password again"), {
    target: { value: passwordAgain },
  });
  fireEvent.click(screen.queryByText("Submit"));
  expect(onSubmit).toHaveBeenCalledWith({ newPassword: password });
});

test("Should not show if there's no user in the page", () => {
  render(<ResetPassword onSubmit={onSubmit} />);
  expect(screen.queryByLabelText("New password")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("New password again")).not.toBeInTheDocument();
  expect(screen.queryByText("Submit")).not.toBeInTheDocument();
  expect(screen.queryByText("invalid", { exact: false })).toBeInTheDocument();
});
