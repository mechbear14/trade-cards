import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RegisterForm } from "./RegisterForm";

const onRegister = jest.fn();

beforeEach(() => {
  onRegister.mockClear();
});

test("should submit form", () => {
  render(<RegisterForm onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText("Password"), {
    target: { value: "test1234" },
  });
  fireEvent.change(screen.queryByLabelText("Password recovery email"), {
    target: { value: "oasis5@uwe.ac.uk" },
  });
  fireEvent.click(screen.queryByText("Register"));
  expect(onRegister).toHaveBeenCalledWith({
    password: "test1234",
    email: "oasis5@uwe.ac.uk",
  });
});

test("Should not submit incomplete form", () => {
  render(<RegisterForm onRegister={onRegister} />);
  fireEvent.change(screen.queryByLabelText("Password"), {
    target: { value: "test1234" },
  });
  fireEvent.click(screen.queryByText("Register"));
  expect(onRegister).toHaveBeenCalledTimes(0);
  expect(screen.queryByText(/cannot be blank/)).toBeInTheDocument();
});

test("Should show register error", () => {
  render(<RegisterForm registerError={new Error("Wrong bear")} />);
  expect(screen.queryByText("Wrong bear")).toBeInTheDocument();
});
