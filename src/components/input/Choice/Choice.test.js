import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Choice from "./Choice";

const choices = [
  {
    name: "season",
    text: "Seasons",
  },
  {
    name: "cards",
    text: "Cards",
  },
  {
    name: "connections",
    text: "Connections",
  },
];

const Context = React.createContext();

const ChoiceTester = (props) => {
  const [currentPage, setCurrentPage] = useState(
    props.selected || props.choices[0]
  );
  const onChange = jest.fn((e) => {
    if (e.target.checked) {
      setCurrentPage(e.target.value);
    }
  });
  return (
    <div>
      <Context.Provider value={{ onChange, currentPage }}>
        <Choice
          name="page"
          choices={props.choices}
          onSelect={onChange}
          selected={currentPage}
        />
      </Context.Provider>
    </div>
  );
};

test("should display options", () => {
  render(<ChoiceTester choices={choices} />);
  for (let choice of choices) {
    expect(screen.getByLabelText(choice.text)).toBeInTheDocument();
  }
});

test("should display currently selected", () => {
  render(<ChoiceTester choices={choices} selected={choices[2]} />);
  expect(screen.getByLabelText(choices[0].text)).not.toBeChecked();
  expect(screen.getByLabelText(choices[1].text)).not.toBeChecked();
  expect(screen.getByLabelText(choices[2].text)).toBeChecked();
});

test("should call function when selected", () => {
  render(<ChoiceTester choices={choices} />);
  fireEvent.click(screen.getByLabelText(choices[1].text));
  expect(screen.getByLabelText(choices[0].text)).not.toBeChecked();
  expect(screen.getByLabelText(choices[1].text)).toBeChecked();
  expect(screen.getByLabelText(choices[2].text)).not.toBeChecked();
  fireEvent.click(screen.getByLabelText(choices[2].text));
  expect(screen.getByLabelText(choices[0].text)).not.toBeChecked();
  expect(screen.getByLabelText(choices[1].text)).not.toBeChecked();
  expect(screen.getByLabelText(choices[2].text)).toBeChecked();
});
