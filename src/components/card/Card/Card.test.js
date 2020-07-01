import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Card from "./Card";

test("should display large card colour and text", () => {
  let card = {
    kind: "white",
    text: "OpenFrameworks",
  };
  render(<Card card={card} small={false} />);
  expect(screen.queryByText(card.text)).not.toBeNull();
  expect(screen.queryByText(card.text).classList).toContain(card.kind);
  expect(screen.queryByText(card.text).classList).not.toContain("small");
});

test("should display small card colour and text", () => {
  let card = {
    kind: "blue",
    text: "Render engine",
  };
  render(<Card card={card} small={true} />);
  expect(screen.queryByText(card.text)).not.toBeNull();
  expect(screen.queryByText(card.text).classList).toContain(card.kind);
  expect(screen.queryByText(card.text).classList).toContain("small");
});
