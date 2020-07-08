import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ViewConnection } from "./ViewConnection";

test("Should display current card and count", () => {
  const card = { kind: "red", text: "anti-aliasing algorithms" };
  const connected = [
    { kind: "red", text: "spectrum aliasing", count: 1 },
    { kind: "red", text: "sampling theorem", count: 1 },
  ];
  render(
    <ViewConnection current={card} connected={connected} knowResult={true} />
  );
  expect(screen.queryByText(card.test)).toBeInTheDocument();
  expect(screen.queryByText(connected[0])).toBeInTheDocument();
  expect(screen.queryByText(connected[0].count)).toBeInTheDocument();
  expect(screen.queryByText(connected[1])).toBeInTheDocument();
  expect(screen.queryByText(connected[1].count)).toBeInTheDocument();
});

test("Should display loading spinner", () => {
  const card = { kind: "red", text: "anti-aliasing algorithms" };
  const connected = [
    { kind: "red", text: "spectrum aliasing", count: 1 },
    { kind: "red", text: "sampling theorem", count: 1 },
  ];
  render(
    <ViewConnection current={card} connected={connected} knowResult={false} />
  );
  expect(screen.queryByText("Loading")).toBeInTheDocument();
});
