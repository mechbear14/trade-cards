import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Home } from "./Home";

const season = {
  label: "1",
  title: "The First Season",
  registerStartTime: new Date(2020, 8, 5, 8, 0),
  registerEndTime: new Date(2020, 8, 5, 12, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

test("Should ask for current season", () => {
  const GetSeasons = jest.fn();
  render(<Home GetSeasons={GetSeasons} currentSeason={null} />);
  expect(GetSeasons).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("Loading")).toBeInTheDocument();
});

test("Should show season about to open for register", () => {
  const today = new Date(2020, 8, 5, 6, 0);
  render(<Home currentSeason={season} today={today} />);
  expect(screen.queryByText(season.title)).toBeInTheDocument();
  expect(screen.queryByText("Register now")).not.toBeInTheDocument();
  expect(screen.queryByText("opening soon")).toBeInTheDocument();
});

test("Should show season open to register", () => {
  const today = new Date(2020, 8, 5, 10, 0);
  render(<Home currentSeason={season} today={today} />);
  expect(screen.queryByText(season.title)).toBeInTheDocument();
  expect(screen.queryByText("Register now")).toBeInTheDocument();
  expect(screen.queryByText("opening soon")).not.toBeInTheDocument();
});

test("Should show ongoing season (register closed)", () => {
  const today = new Date(2020, 8, 5, 14, 0);
  render(<Home currentSeason={season} today={today} />);
  expect(screen.queryByText(season.title)).toBeInTheDocument();
  expect(screen.queryByText("Register now")).not.toBeInTheDocument();
  expect(screen.queryByText("has closed")).toBeInTheDocument();
});

test("Should show no season", () => {
  render(<Home currentSeason={null} />);
  expect(screen.queryByText("Register now")).not.toBeInTheDocument();
  expect(screen.queryByText("no ongoing seasons")).toBeInTheDocument();
});
