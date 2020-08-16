import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ConnectionWithDate } from "./ConnectionWithDate";

const connection = {
  card1: { kind: "red", text: "Text-based UI" },
  card2: { kind: "red", text: "Huawei" },
  createdAt: new Date(2020, 6, 1, 14, 32),
};

const onClick = jest.fn();

beforeEach(() => {
  onClick.mockClear();
});

test("Should display connection and date", () => {
  render(<ConnectionWithDate connection={connection} onClickCard={onClick} />);
  expect(screen.queryByText(connection.card1.text)).toBeInTheDocument();
  expect(screen.queryByText(connection.card1.text)).toHaveClass(
    connection.card1.kind
  );
  expect(screen.queryByText(connection.card2.text)).toBeInTheDocument();
  expect(screen.queryByText(connection.card2.text)).toHaveClass(
    connection.card2.kind
  );
  expect(screen.queryByText("1432")).toBeInTheDocument();
  expect(screen.queryByText("01JUL20")).toBeInTheDocument();
  fireEvent.click(screen.queryByText(connection.card1.text));
  expect(onClick).toHaveBeenCalledTimes(0);
});

test("Should make the card clickable", () => {
  render(
    <ConnectionWithDate
      connection={connection}
      cardClickable={true}
      onClickCard={onClick}
    />
  );
  fireEvent.click(screen.queryByText(connection.card1.text));
  expect(onClick).toHaveBeenCalledWith(connection.card1);
  fireEvent.click(screen.queryByText(connection.card2.text));
  expect(onClick).toHaveBeenCalledWith(connection.card2);
});
