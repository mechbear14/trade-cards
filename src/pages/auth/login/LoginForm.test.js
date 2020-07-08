import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LoginForm } from "./LoginForm";

const onLogin = jest.fn();

beforeEach(() => {
  onLogin.mockClear();
});

test("should submit form", () => {
  render(<LoginForm onLogin={onLogin} />);
  fireEvent.change(screen.queryByLabelText("call sign", { exact: false }), {
    target: { value: "ThunderBear" },
  });
  fireEvent.change(screen.queryByLabelText("password", { exact: false }), {
    target: { value: "test1234" },
  });
  fireEvent.click(screen.queryByText("Log in"));
  expect(onLogin).toHaveBeenCalledWith({
    callSign: "ThunderBear",
    password: "test1234",
  });
});

test("Should not submit incomplete form", () => {
  render(<LoginForm onLogin={onLogin} />);
  fireEvent.change(screen.queryByLabelText("password", { exact: false }), {
    target: { value: "test1234" },
  });
  fireEvent.click(screen.queryByText("Log in"));
  expect(onLogin).toHaveBeenCalledTimes(0);
  expect(screen.queryByText(/cannot be blank/)).toBeInTheDocument();
});

test("Should show login error", () => {
  render(<LoginForm loginError={new Error("Wrong bear")} />);
  expect(screen.queryByText("Wrong bear")).toBeInTheDocument();
});
