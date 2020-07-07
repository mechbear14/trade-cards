import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { NoCardToday } from "./NoCardToday";

test("should render", () => {
  render(<NoCardToday />);
  expect(screen.queryByText(/You haven't got a card/)).toBeInTheDocument();
});
