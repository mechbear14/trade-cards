import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CardWithCount } from "./CardWithCount";

test("Should display card and count", () => {
  const card = { kind: "red", text: "spectrum aliasing" };
  const count = 1;
  const onClick = jest.fn();
  render(<CardWithCount card={card} count={count} onClick={onClick} />);
  expect(screen.queryByText(card.text)).toBeInTheDocument();
  expect(screen.queryByText(card.text)).toHaveClass(card.kind);
  expect(screen.queryByText("1")).toBeInTheDocument();
  fireEvent.click(screen.queryByText(card.text));
  expect(onClick).toHaveBeenCalledTimes(1);
});
