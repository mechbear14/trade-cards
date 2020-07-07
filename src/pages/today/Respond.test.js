import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Respond } from "./Respond";

const cardGiven = {
  kind: "white",
  text: "SYCL",
};

const onRespond = jest.fn();

beforeEach(() => {
  onRespond.mockClear();
});

test("Should show the card today", () => {
  render(<Respond cardGiven={cardGiven} />);
  expect(screen.queryByText("SYCL")).toBeInTheDocument();
  expect(screen.queryByText("SYCL")).toHaveClass("white");
});

test("Should submit card", () => {
  render(<Respond cardGiven={cardGiven} onRespond={onRespond} />);
  fireEvent.click(screen.queryByLabelText("Red"));
  fireEvent.change(screen.queryByPlaceholderText("Card text"), {
    target: { value: "Computing" },
  });
  fireEvent.click(screen.queryByText("Respond"));
  expect(onRespond).toHaveBeenCalledWith({ kind: "red", text: "Computing" });
});

test("Should not submit incomplete card", () => {
  render(<Respond cardGiven={cardGiven} onRespond={onRespond} />);
  fireEvent.click(screen.queryByLabelText("Red"));
  fireEvent.click(screen.queryByText("Respond"));
  expect(onRespond).toHaveBeenCalledTimes(0);
  expect(screen.queryByText(/cannot be blank/)).toBeInTheDocument();
});

test("Should show submit error", () => {
  render(
    <Respond cardGiven={cardGiven} respondError={new Error("No internet")} />
  );
  expect(screen.queryByText("No internet")).toBeInTheDocument();
});

test("Should not submit twice", () => {
  render(
    <Respond cardGiven={cardGiven} onRespond={onRespond} responding={true} />
  );
  fireEvent.click(screen.queryByText("Respond"));
  expect(onRespond).toHaveBeenCalledTimes(0);
});
