import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorBox from "./ErrorBox";

test("Should show one error", () => {
  let error = new Error("Message is not defined");
  render(<ErrorBox error={error} />);
  expect(screen.getByText("Message is not defined")).toBeInTheDocument();
});

test("Should show a list of error", () => {
  let errors = [
    new Error("Email cannot be blank"),
    new Error("Password cannot be blank"),
  ];
  render(<ErrorBox error={errors} />);
  expect(screen.getByText("Email cannot be blank")).toBeInTheDocument();
  expect(screen.getByText("Password cannot be blank")).toBeInTheDocument();
});

test("Should show an error with details", () => {
  let error = new Error("INTERNAL");
  error.details = "Cannot read property undefined of undefined";
  render(<ErrorBox error={error} />);
  expect(screen.getByText("INTERNAL")).toBeInTheDocument();
  expect(
    screen.getByText("Cannot read property undefined of undefined")
  ).toBeInTheDocument();
});
