import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SeasonDisplay from "./SeasonDisplay";

let season = {
  label: "1",
  title: "The First Season",
  registerStartTime: new Date(2020, 8, 5, 8, 0),
  registerEndTime: new Date(2020, 8, 5, 12, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

let season2 = {
  label: "2",
  title: "The Second Season",
  registerStartTime: new Date(2020, 8, 5, 21, 0),
  registerEndTime: new Date(2020, 8, 6, 1, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

let season3 = {
  label: "2",
  title: "The Second Season",
  registerStartTime: new Date(2020, 8, 5, 21, 0),
  registerEndTime: new Date(2020, 9, 5, 1, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

test("should display a season whose register (one day) has not ended", () => {
  let today = new Date(2020, 6, 7);
  render(<SeasonDisplay season={season} today={today} />);
  expect(screen.getByTestId("season-title").textContent).toEqual(season.title);
  expect(screen.getByTestId("season-label").textContent).toEqual(season.label);
  expect(screen.getByTestId("season-dates").textContent).toEqual(
    `Register opens 0800-1200 05SEP20`
  );
});

test("should display a season whose register (two days) has not ended", () => {
  let today = new Date(2020, 6, 7);
  render(<SeasonDisplay season={season2} today={today} />);
  expect(screen.getByTestId("season-title").textContent).toEqual(season2.title);
  expect(screen.getByTestId("season-label").textContent).toEqual(season2.label);
  expect(screen.getByTestId("season-dates").textContent).toEqual(
    `Register opens 2100 05SEP20-0100 06SEP20`
  );
});

test("should display a season whose register has ended", () => {
  let today = new Date(2021, 6, 7);
  render(<SeasonDisplay season={season} today={today} />);
  expect(screen.getByTestId("season-title").textContent).toEqual(season.title);
  expect(screen.getByTestId("season-label").textContent).toEqual(season.label);
  expect(screen.getByTestId("season-dates").textContent).toEqual(
    `12SEP20-21DEC20`
  );
});

test("should display a season whose register (two days in same month) has not ended", () => {
  let today = new Date(2020, 6, 7);
  render(<SeasonDisplay season={season3} today={today} />);
  expect(screen.getByTestId("season-title").textContent).toEqual(season3.title);
  expect(screen.getByTestId("season-label").textContent).toEqual(season3.label);
  expect(screen.getByTestId("season-dates").textContent).toEqual(
    `Register opens 2100 05SEP20-0100 05OCT20`
  );
});
