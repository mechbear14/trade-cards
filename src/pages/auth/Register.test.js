import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Register } from "./Register";

test("Should not submit when a field is empty", () => {
  const onRegister = jest.fn();
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  expect(onLogin).toHaveBeenCalledTimes(0);
  expect(screen.queryByText("cannot be blank")).toBeInTheDocument();
});

test("Should submit when both fields are filled and check email", () => {
  const onRegister = jest.fn();
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  expect(onLogin).toHaveBeenCalledTimes(1);
});

test("Should show register error", () => {
  const onRegister = jest.fn(() => {
    return new Promise((resolve, reject) => reject(new Error("Roar!")));
  });
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  fireEvent.click(screen.queryByText("Register"));
  fireEvent.click(screen.queryByText("Register"));
  expect(onRegister).toHaveBeenCalledTimes(1);
  setTimeout(() => {
    expect(screen.queryByText("Roar")).toBeInTheDocument();
    fireEvent.click(screen.queryByText("Register"));
    expect(onRegister).toHaveBeenCalledTimes(2);
  }, 5000);
});

test("Should ask user to check email", () => {
  const onRegister = jest.fn(() => {
    return new Promise((resolve, reject) => resolve({ previous: null }));
  });
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  setTimeout(() => {
    expect(screen.queryByText("We've sent an email")).toBeInTheDocument();
  }, 5000);
});

test("Should show when user has previously registered", () => {
  const onRegister = jest.fn(() => {
    return new Promise((resolve, reject) =>
      resolve({ previous: { callSign: "BrownJeans" } })
    );
  });
  render(<Register onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  setTimeout(() => {
    expect(screen.queryByText("We've seen you before")).toBeInTheDocument();
  }, 5000);
});

test("Should create a new user when want a new call sign", () => {
  const onRegister = jest.fn(() => {
    return new Promise((resolve, reject) =>
      resolve({ previous: { callSign: "BrownJeans" } })
    );
  });
  const onNewCallSign = jest.fn();
  render(<Register onRegister={onRegister} onNewCallSign={onNewCallSign} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  setTimeout(() => {
    fireEvent.click(screen.queryByText("No"));
    expect(onNewCallSign).toHaveBeenCalledTimes(1);
  }, 5000);
});

test("Should refer to log in when previous user is used", () => {
  const onRegister = jest.fn(() => {
    return new Promise((resolve, reject) =>
      resolve({ previous: { callSign: "BrownJeans" } })
    );
  });
  const onUsePrevious = jest.fn();
  render(<Register onRegister={onRegister} onUsePrevious={onUsePrevious} />);
  fireEvent.change(screen.queryByLabelText(/Password\b/), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("email"), {
    target: { value: "oasis2@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  setTimeout(() => {
    fireEvent.click(screen.queryByText("No"));
    expect(onUsePrevious).toHaveBeenCalledTimes(1);
  }, 5000);
});
