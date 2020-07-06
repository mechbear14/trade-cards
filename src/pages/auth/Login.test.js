import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Login } from "./Login";

test("Should not submit when a field is empty", () => {
  const onLogin = jest.fn();
  render(<Login onLogin={onLogin} />);
  fireEvent.change(screen.queryByLabelText("Call sign"), {
    target: { value: "BlueBear" },
  });
  fireEvent.click(screen.queryByText("Log in"));
  expect(onLogin).toHaveBeenCalledTimes(0);
  expect(screen.queryByText("cannot be blank")).toBeInTheDocument();
});

test("Should show forget password when forget password", () => {
  render(<Login />);
  fireEvent.click(screen.queryByText("Forgot password"));
  expect(screen.queryByText("Password recovery")).toBeInTheDocument();
  expect(screen.queryByLabelText("recovery email")).toBeInTheDocument();
});

test("Should not submit when email is not filled", () => {
  const onPasswordRecover = jest.fn();
  render(<Login onPasswordRecover={onPasswordRecover} />);
  fireEvent.click(screen.queryByText("Forgot password"));
  fireEvent.click(screen.queryByText("Continue"));
  expect(onPasswordRecover).toHaveBeenCalledTimes(0);
  expect(screen.queryByText("cannot be blank")).toBeInTheDocument();
});

test("Should submit when email is filled", () => {
  const onPasswordRecover = jest.fn(
    () =>
      new Promise((resolve, reject) => {
        setTimeOut(resolve, 5000);
      })
  );
  render(<Login onPasswordRecover={onPasswordRecover} />);
  fireEvent.click(screen.queryByText("Forgot password"));
  fireEvent.change(screen.queryByLabelText("recovery email"), {
    target: { value: "oasis@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Continue"));
  expect(onPasswordRecover).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("We've sent an email")).toBeInTheDocument();
});

test("Should go back to login", () => {
  render(<Login />);
  fireEvent.click(screen.queryByText("Forgot password"));
  fireEvent.click(screen.queryByText("Back"));
  expect(screen.queryByLabelText("Call sign")).toBeInTheDocument();
});

test("Should show login error", () => {
  const onLogin = jest.fn(() => {
    return new Promise((resolve, reject) => reject(new Error("Roar!")));
  });
  render(<Login onLogin={onLogin} />);
  fireEvent.change(screen.queryByLabelText("Call sign"), {
    target: { value: "BlueBear" },
  });
  fireEvent.change(screen.queryByLabelText("Password"), {
    target: { value: "test1234" },
  });
  fireEvent.click(screen.queryByText("Log in"));
  expect(onLogin).toHaveBeenCalledWith({
    callSign: "Bluebear",
    password: "test1234",
  });
  expect(onLogin).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("Roar!")).toBeInTheDocument();
});

test("Should not submit twice when login", () => {
  const onLogin = jest.fn(() => {
    return new Promise((resolve, reject) =>
      setTimeOut(() => reject(new Error("Again")), 5000)
    );
  });
  render(<Login onLogin={onLogin} />);
  fireEvent.change(screen.queryByLabelText("Call sign"), {
    target: { value: "BlueBear" },
  });
  fireEvent.change(screen.queryByLabelText("Password"), {
    target: { value: "test1234" },
  });
  fireEvent.click(screen.queryByText("Log in"));
  fireEvent.click(screen.queryByText("Log in"));
  fireEvent.click(screen.queryByText("Log in"));
  expect(onLogin).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    fireEvent.click(screen.queryByText("Log in"));
    expect(onLogin).toHaveBeenCalledTimes(2);
  }, 5000);
});

test("Should not submit twice when resetting password", () => {
  const onPasswordRecover = jest.fn(
    () =>
      new Promise((resolve, reject) => {
        setTimeOut(() => reject(new Error("Again")), 5000);
      })
  );
  render(<Login onPasswordRecover={onPasswordRecover} />);
  fireEvent.click(screen.queryByText("Forgot password"));
  fireEvent.change(screen.queryByLabelText("recovery email"), {
    target: { value: "oasis@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Continue"));
  fireEvent.click(screen.queryByText("Continue"));
  fireEvent.click(screen.queryByText("Continue"));
  expect(onLogin).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    fireEvent.click(screen.queryByText("Continue"));
    expect(onLogin).toHaveBeenCalledTimes(2);
  }, 5000);
});
