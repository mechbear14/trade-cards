import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CardWithClick from "./CardWithClick";

test("should click", () => {
  let card = {
    kind: "white",
    text: "OpenFrameworks",
  };
  const onClick = jest.fn();
  render(<CardWithClick card={card} small={false} onClick={onClick} />);
  fireEvent.click(screen.getByText(card.text));
  expect(onClick).toHaveBeenCalledTimes(1);
});
