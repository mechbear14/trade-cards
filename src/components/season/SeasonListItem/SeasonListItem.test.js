import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import SeasonListItem from "./SeasonListItem";

let season = {
  label: "1",
  title: "The First Season",
  registerStartTime: new Date(2020, 8, 5, 8, 0),
  registerEndTime: new Date(2020, 8, 5, 12, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

let checkInfo = (season, status) => {
  expect(screen.getByTestId("label").textContent).toEqual(season.label);
  expect(screen.getByTestId("title").textContent).toEqual(season.title);
  expect(screen.getByTestId("status").textContent).toEqual(status);
  expect(screen.getByTestId("dates").textContent).toEqual("12SEP20-21DEC20");
  expect(screen.getByTestId("register-times").textContent).toEqual(
    "0800-1200 05SEP20"
  );
};

test("should display a season whose register has not started", () => {
  let today = new Date(2020, 5, 7);
  render(<SeasonListItem season={season} today={today} />);
  checkInfo(season, "Not open yet");
});

test("should display a season whose register has started", () => {
  let today = new Date(2020, 8, 5, 9, 0, 0);
  render(<SeasonListItem season={season} today={today} />);
  checkInfo(season, "Register open");
});

test("Should display a season whose register has ended but the season has not started", () => {
  let today = new Date(2020, 8, 5, 14, 0, 0);
  render(<SeasonListItem season={season} today={today} />);
  checkInfo(season, "Register closed");
});

test("Should display a season that has started", () => {
  let today = new Date(2020, 8, 13);
  render(<SeasonListItem season={season} today={today} />);
  checkInfo(season, "Season started");
});

test("Should display a season that has ended", () => {
  let today = new Date(2021, 8, 13);
  render(<SeasonListItem season={season} today={today} />);
  checkInfo(season, "Season ended");
});

test("should toggle show/hide when clicked", () => {
  let today = new Date(2020, 5, 7);
  render(<SeasonListItem season={season} today={today} />);
  expect(screen.getByTestId("detail-box")).toHaveClass("hide");
  fireEvent.click(screen.getByTestId("title-box"));
  expect(screen.getByTestId("detail-box")).not.toHaveClass("hide");
  fireEvent.click(screen.getByTestId("title-box"));
  expect(screen.getByTestId("detail-box")).toHaveClass("hide");
});

test("should display end register button when register open", () => {
  let today = new Date(2020, 8, 5, 9, 0, 0);
  render(<SeasonListItem season={season} today={today} />);
  expect(screen.queryByText("Edit")).toBeInTheDocument();
  expect(screen.queryByText("End register")).toBeInTheDocument();
  expect(screen.queryByText("End season")).not.toBeInTheDocument();
});

test("should display end season before season ends", () => {
  let today = new Date(2020, 8, 13);
  render(<SeasonListItem season={season} today={today} />);
  expect(screen.queryByText("Edit")).toBeInTheDocument();
  expect(screen.queryByText("End register")).not.toBeInTheDocument();
  expect(screen.queryByText("End season")).toBeInTheDocument();
});

test("should not display any button after a season ended", () => {
  let today = new Date(2021, 8, 13);
  render(<SeasonListItem season={season} today={today} />);
  expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  expect(screen.queryByText("End register")).not.toBeInTheDocument();
  expect(screen.queryByText("End season")).not.toBeInTheDocument();
});
