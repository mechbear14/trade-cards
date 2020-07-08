import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ViewConnection } from "./ViewConnection";

test("Should display current card and count", () => {
  const card = { kind: "red", text: "anti-aliasing algorithms" };
  const connected = [
    { id: "1234", kind: "red", text: "spectrum aliasing", count: 2 },
    { id: "1236", kind: "red", text: "sampling theorem", count: 1 },
  ];
  render(
    <ViewConnection current={card} connected={connected} knowResult={true} />
  );
  expect(screen.queryByText(card.text)).toBeInTheDocument();
  expect(screen.queryByText(connected[0].text)).toBeInTheDocument();
  expect(screen.queryByText(connected[0].count.toString())).toBeInTheDocument();
  expect(screen.queryByText(connected[1].text)).toBeInTheDocument();
  expect(screen.queryByText(connected[1].count.toString())).toBeInTheDocument();
});

test("Should display loading spinner", () => {
  const card = { kind: "red", text: "anti-aliasing algorithms" };
  const connected = [
    { id: "1234", kind: "red", text: "spectrum aliasing", count: 2 },
    { id: "1236", kind: "red", text: "sampling theorem", count: 1 },
  ];
  render(
    <ViewConnection current={card} connected={connected} knowResult={false} />
  );
  expect(screen.queryByText("Loading")).toBeInTheDocument();
});

test("Should change viewing card", () => {
  const onViewCard = jest.fn();
  const card = { kind: "red", text: "anti-aliasing algorithms" };
  const connected = [
    { id: "1234", kind: "red", text: "spectrum aliasing", count: 2 },
    { id: "1236", kind: "red", text: "sampling theorem", count: 1 },
  ];
  render(
    <ViewConnection
      current={card}
      connected={connected}
      knowResult={true}
      onViewCard={onViewCard}
    />
  );
  fireEvent.click(screen.queryByText("sampling theorem"));
  expect(onViewCard).toHaveBeenCalledWith(connected[1]);
});
