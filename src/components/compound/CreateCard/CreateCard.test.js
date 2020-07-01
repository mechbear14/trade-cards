import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CreateCard from "./CreateCard";

test("Should render", () => {
  const newCard = {
    kind: "blue",
    text: "Shredder",
  };
  const onChange = jest.fn();
  render(<CreateCard card={newCard} onChangeText={onChange} />);
  expect(screen.getByLabelText("Blue")).toBeChecked();
  expect(screen.getByText("Shredder")).toBeInTheDocument();
});

test("should render existing card", () => {
  const card = { kind: "red", text: "WebSocket" };
  render(<CreateCard card={card} />);
  expect(screen.getByLabelText("Red")).toBeChecked();
  expect(screen.getByText("WebSocket")).toBeInTheDocument();
});

test("Should update card", () => {
  let newCard = {
    kind: "blue",
    text: "",
  };
  const onChange = (event) => {
    newCard = {
      ...newCard,
      [event.target.name]: event.target.value,
    };
  };
  const onSelect = (event) => {
    if (event.target.checked) {
      newCard = {
        ...newCard,
        kind: event.target.value,
      };
    }
  };
  render(
    <CreateCard
      card={newCard}
      onChangeText={onChange}
      onSelectKind={onSelect}
    />
  );
  fireEvent.click(screen.getByText("Red"));
  fireEvent.change(screen.getByTestId("card-input"), {
    target: { value: "Roar!" },
  });
  expect(newCard.kind).toEqual("red");
  expect(newCard.text).toEqual("Roar!");
});
