import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CardSelect from "./CardSelect";

const cards = [
  {
    id: "1234",
    kind: "red",
    text: "Socket programming",
  },
  {
    id: "5678",
    kind: "red",
    text: "Socket",
  },
];

let selected = [];

const onChange = (e) => {
  if (e.target.checked) {
    let card = cards.filter((card) => card.id === e.target.id)[0];
    selected.push(card);
  } else {
    selected = selected.filter((card) => card.id !== e.target.id);
  }
};

test("should display card", () => {
  render(<CardSelect card={cards[0]} />);
  expect(screen.queryByText(cards[0].text)).toBeInTheDocument();
});

test("should start out blank", () => {
  render(
    <React.Fragment>
      {cards.map((card) => (
        <CardSelect card={card} key={card.id} onChange={onChange} />
      ))}
    </React.Fragment>
  );
  let checkboxes = screen.queryAllByTestId("checkbox");
  expect(checkboxes[0]).not.toBeChecked();
  expect(checkboxes[1]).not.toBeChecked();
});

test("should call function when check and uncheck", () => {
  render(
    <React.Fragment>
      {cards.map((card) => (
        <CardSelect
          card={card}
          propName={card.id}
          key={card.id}
          onChange={onChange}
        />
      ))}
    </React.Fragment>
  );
  let checkboxes = screen.queryAllByTestId("checkbox");
  fireEvent.click(checkboxes[0]);
  expect(selected).toContain(cards[0]);
  fireEvent.click(checkboxes[1]);
  expect(selected).toContain(cards[0]);
  expect(selected).toContain(cards[1]);
  fireEvent.click(checkboxes[0]);
  expect(selected).not.toContain(cards[0]);
  expect(selected).toContain(cards[1]);
});
