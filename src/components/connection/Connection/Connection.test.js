import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Connection from "./Connection";

test("should display cards", () => {
  let connection = {
    card1: {
      kind: "white",
      text: "Boost.Asio",
    },
    card2: {
      kind: "red",
      text: "Network programming",
    },
  };
  render(<Connection connection={connection} />);
  expect(screen.getByText(connection.card1.text)).not.toBeNull();
  expect(screen.getByText(connection.card2.text)).not.toBeNull();
});
