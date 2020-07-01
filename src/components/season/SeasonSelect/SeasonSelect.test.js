import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SeasonSelect from "./SeasonSelect";

const seasons = [
  { label: "1", title: "The First Season" },
  { label: "2", title: "Roar! You've found me!" },
  { label: "3", title: "New Wave" },
  { label: "4", title: "Wanderer of Time" },
];

test("Should show no seasons with an empty list", () => {
  render(<SeasonSelect seasons={[]} />);
  expect(screen.getByText("No season available")).toBeInTheDocument();
});

test("Should show selected season", () => {
  render(<SeasonSelect seasons={seasons} selected={seasons[0]} />);
  expect(screen.getByText(seasons[0].label)).toBeInTheDocument();
  expect(screen.getByText(seasons[0].title)).toBeInTheDocument();
});

test("Should show all seasons in a dropdown", () => {
  render(<SeasonSelect seasons={seasons} selected={seasons[0]} />);
  fireEvent.click(screen.getByTestId("dropdown-button"));
  for (let season of seasons) {
    if (season.label === seasons[0].label) {
      expect(screen.getAllByText(season.label).length).toEqual(2);
      expect(screen.getAllByText(season.title).length).toEqual(2);
    } else {
      expect(screen.getByText(season.label)).toBeInTheDocument();
      expect(screen.getByText(season.title)).toBeInTheDocument();
    }
  }
});

test("Should toggle show/hide dropdown", () => {
  render(<SeasonSelect seasons={seasons} selected={seasons[0]} />);
  fireEvent.click(screen.getByTestId("dropdown-button"));
  fireEvent.click(screen.getByTestId("dropdown-button"));
  for (let season of seasons) {
    if (season.label === seasons[0].label) {
      expect(screen.getAllByText(season.label).length).toEqual(1);
      expect(screen.getAllByText(season.title).length).toEqual(1);
    } else {
      expect(screen.queryByText(season.label)).not.toBeInTheDocument();
      expect(screen.queryByText(season.title)).not.toBeInTheDocument();
    }
  }
});

test("Should select one option and call function", () => {
  const onSelect = jest.fn();
  render(
    <SeasonSelect seasons={seasons} selected={seasons[0]} onSelect={onSelect} />
  );
  fireEvent.click(screen.getByTestId("dropdown-button"));
  fireEvent.click(screen.getByText(seasons[2].title));
  expect(screen.queryByText(seasons[1].label)).not.toBeInTheDocument();
  expect(screen.queryByText(seasons[1].title)).not.toBeInTheDocument();
  expect(onSelect).toHaveBeenCalledWith(seasons[2]);
});
