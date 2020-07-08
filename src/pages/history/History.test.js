import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import moment from "moment";

import { History } from "./History";

const history = [
  {
    card1: { kind: "red", text: "3D rendering" },
    card2: { kind: "white", text: "Three.js" },
    createdAt: new Date(2020, 6, 13, 12, 0, 0),
  },
  {
    card1: { kind: "red", text: "3D rendering" },
    card2: { kind: "white", text: "Three.js" },
    createdAt: new Date(2020, 6, 14, 12, 0, 0),
  },
  {
    card1: { kind: "red", text: "3D rendering" },
    card2: { kind: "white", text: "Three.js" },
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
      screen.queryByText(moment(c.createdAt).format("ddMMMyy").toUpperCase())
    ).toBeInTheDocument();
  }
});

test("Should display loading spinner", () => {
  render(<History history={history} knowHistory={true} />);
  expect(screen.queryByText("Loading")).toBeInTheDocument();
});
