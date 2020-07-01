import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ConnectionJudge from "./ConnectionJudge";

let connections = [
  {
    id: "1234",
    card1: {
      kind: "white",
      text: "Socket.io",
    },
    card2: {
      kind: "blue",
      text: "Chatrooms",
    },
    status: "needsCheck",
  },
  {
    id: "5678",
    card1: {
      kind: "white",
      text: "Socket.io",
    },
    card2: {
      kind: "blue",
      text: "Socket.io",
    },
    status: "needsCheck",
  },
];

let onChange = (e) => {
  if (e.target.checked) {
    let connection = connections.filter(
      (connection) => connection.id === e.target.name
    );
    if (connection.length === 1) connection[0].status = e.target.id;
    else throw new Error("Non-existing or duplicate connection");
  }
};

test("Should display cards", () => {
  let connection = connections[0];
  render(<ConnectionJudge connection={connection} onChange={onChange} />);
  expect(screen.queryByText("Socket.io")).not.toBeNull();
  expect(screen.queryByText("Chatrooms")).not.toBeNull();
});

test("should call function when selected", () => {
  let connection = connections[0];
  render(<ConnectionJudge connection={connection} onChange={onChange} />);
  fireEvent.click(screen.queryByTestId("approve"));
  expect(connection.status).toEqual("approve");
});

test("Should allow only one choice at once", () => {
  let connection = connections[0];
  render(<ConnectionJudge connection={connection} onChange={onChange} />);
  fireEvent.click(screen.queryByTestId("inappropriate"));
  expect(screen.queryByTestId("approve-radio").attributes.checked).toBeFalsy();
  expect(
    screen.queryByTestId("needsCheck-radio").attributes.checked
  ).toBeFalsy();
  expect(
    screen.queryByTestId("inappropriate-radio").attributes.checked
  ).toBeFalsy();
});
