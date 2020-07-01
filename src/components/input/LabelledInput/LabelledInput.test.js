import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import LabelledInput from "./LabelledInput";

let state = {
  word: "Roar",
};

let onChange = jest.fn((e) => {
  state = {
    [e.target.id]: e.target.value,
  };
});

test("Should start empty", () => {
  render(<LabelledInput type="text" labelText="Word" propName="word" />);
  expect(screen.getByText("Word")).toBeInTheDocument();
  expect(screen.getByTestId("input").value).toBe("");
});

test("should display an existing value", () => {
  render(
    <LabelledInput
      type="text"
      labelText="Word"
      value={state.word}
      onChange={onChange}
      propName="word"
    />
  );
  expect(screen.getByTestId("input").value).toEqual(state.word);
  expect(screen.getByText("Word").classList).toContain("filled");
});

test("should change appearance when typing", () => {
  render(
    <LabelledInput
      type="text"
      labelText="Word"
      value={state.word}
      onChange={onChange}
      propName="word"
    />
  );
  screen.getByLabelText("Word").focus();
  expect(screen.getByTestId("bar").classList).toContain("typing");
  screen.getByLabelText("Word").blur();
  expect(screen.getByTestId("bar").classList).not.toContain("typing");
});
