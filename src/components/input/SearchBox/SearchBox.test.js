import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SearchBox from "./SearchBox";

test("Should call function when typing", () => {
  let object = {
    text: "",
  };
  const onChange = (event) => {
    object = {
      [event.target.id]: event.target.value,
    };
  };
  const message = "Roar! You've found me!";
  render(<SearchBox propName="text" value={object.text} onChange={onChange} />);
  fireEvent.click(screen.getByTestId("search-box"));
  fireEvent.change(screen.getByTestId("search-box"), {
    target: { value: message },
  });
  expect(object.text).toEqual(message);
});

test("Should change appearance when typing", () => {
  render(<SearchBox />);
  fireEvent.focus(screen.getByTestId("search-box"));
  expect(screen.getByTestId("search-bar")).toHaveClass("typing");
});

test("Should call function when clicked search", () => {
  const value = "Roar! You've found me!";
  const onChange = jest.fn();
  const onSearch = jest.fn();
  render(<SearchBox value={value} onChange={onChange} onSearch={onSearch} />);
  fireEvent.click(screen.getByTestId("search-button"));
  expect(onSearch).toHaveBeenCalledTimes(1);
});

test("Should not search when input is empty", () => {
  const value = "";
  const onChange = jest.fn();
  const onSearch = jest.fn();
  render(<SearchBox value={value} onChange={onChange} onSearch={onSearch} />);
  fireEvent.click(screen.getByTestId("search-button"));
  expect(onSearch).toHaveBeenCalledTimes(0);
});
