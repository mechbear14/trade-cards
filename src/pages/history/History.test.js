import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import moment from "moment";

import { History } from "./History";

const history = [
  {
    id: 1,
    card1: { kind: "blue", text: "3D rendering1" },
    card2: { kind: "white", text: "Three.js1" },
    createdAt: new Date(2020, 6, 13, 12, 0, 0),
  },
  {
    id: 2,
    card1: { kind: "blue", text: "3D rendering2" },
    card2: { kind: "white", text: "Three.js2" },
    createdAt: new Date(2020, 6, 14, 12, 0, 0),
  },
  {
    id: 3,
    card1: { kind: "blue", text: "3D rendering3" },
    card2: { kind: "white", text: "Three.js3" },
    createdAt: new Date(2020, 6, 15, 12, 0, 0),
  },
];

test("Should display history", () => {
  render(<History history={history} knowHistory={true} />);
  for (let c of history) {
    expect(screen.queryByText(c.card1.text)).toBeInTheDocument();
    expect(screen.queryByText(c.card1.text)).toHaveClass(c.card1.kind);
    expect(screen.queryByText(c.card2.text)).toBeInTheDocument();
    expect(screen.queryByText(c.card2.text)).toHaveClass(c.card2.kind);
    expect(
      screen.queryByText(moment(c.createdAt).format("DDMMMYY").toUpperCase())
    ).toBeInTheDocument();
  }
});

test("Should display empty history", () => {
  render(<History history={[]} knowHistory={true} />);
  expect(
    screen.queryByText("You have not responded", { exact: false })
  ).toBeInTheDocument();
});

test("Should display loading spinner", () => {
  render(<History history={history} knowHistory={false} />);
  expect(screen.queryByText("Loading")).toBeInTheDocument();
});
