import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CardInput from "./CardInput";

test("Should show card", () => {
  let card = {
    kind: "red",
    text: "Stencil test",
  };
  let onChange = jest.fn();
  render(<CardInput card={card} onChange={onChange} />);
  expect(screen.getByText("Stencil test")).toBeInTheDocument();
  expect(screen.getByText("Stencil test")).toHaveClass("red");
});

test("Should call function when changed", () => {
  let object = {
    kind: "red",
    text: "",
  };
  const onChange = jest.fn((event) => {
    object = {
      ...object,
      [event.target.name]: event.target.value,
    };
  });
  const message = "Roar! You've found me!";
  render(<CardInput propName="text" card={object} onChange={onChange} />);
  fireEvent.change(screen.getByTestId("card-input"), {
    target: { value: message },
  });
  expect(object.text).toEqual(message);
});
