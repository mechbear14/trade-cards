import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Complete } from "./Complete";

test("should show completed connection", () => {
  const connection = {
    card1: {
      kind: "red",
      text: "Computing",
    },
    card2: {
      kind: "white",
      text: "SYCL",
    },
  };
  render(<Complete connection={connection} />);
  expect(screen.queryByText(connection.card1.text)).toBeInTheDocument();
  expect(screen.queryByText(connection.card1.text)).toHaveClass(
    connection.card1.kind
  );
  expect(screen.queryByText(connection.card2.text)).toBeInTheDocument();
  expect(screen.queryByText(connection.card2.text)).toHaveClass(
    connection.card2.kind
  );
});
