import {
  NOT_STARTED,
  REGISTER_OPEN,
  REGISTER_CLOSED,
  SEASON_STARTED,
  SEASON_ENDED,
  datesToMsg,
  timesToMsg,
  getSeasonStatusId,
} from "./Common";

const season = {
  label: "1",
  title: "The First Season",
  registerStartTime: new Date(2020, 8, 5, 8, 0),
  registerEndTime: new Date(2020, 8, 5, 12, 0),
  seasonStartDate: new Date(2020, 8, 12),
  seasonEndDate: new Date(2020, 11, 21),
};

test("Should show dates", () => {
  const startDate = new Date(2020, 9, 12);
  const endDate = new Date(2020, 10, 12);
  expect(datesToMsg(startDate, endDate)).toEqual("12OCT20-12NOV20");
});

test("should show times on a same day", () => {
  const startDate = new Date(2020, 9, 12, 12, 0, 0);
  const endDate = new Date(2020, 9, 12, 16, 0, 0);
  expect(timesToMsg(startDate, endDate)).toEqual("1200-1600 12OCT20");
});

test("should show times on different days", () => {
  const startDate = new Date(2020, 9, 12, 8, 0, 0);
  const endDate = new Date(2020, 10, 12, 7, 59, 0);
  expect(timesToMsg(startDate, endDate)).toEqual("0800 12OCT20-0759 12NOV20");
});

test("should show a season whose register has not started", () => {
  let today = new Date(2020, 5, 7);
  expect(getSeasonStatusId(season, today)).toEqual(NOT_STARTED);
});

test("should show a season whose register has started", () => {
  let today = new Date(2020, 8, 5, 9, 0, 0);
  expect(getSeasonStatusId(season, today)).toEqual(REGISTER_OPEN);
});

test("Should show a season whose register has ended but the season has not started", () => {
  let today = new Date(2020, 8, 5, 14, 0, 0);
  expect(getSeasonStatusId(season, today)).toEqual(REGISTER_CLOSED);
});

test("Should show a season that has started", () => {
  let today = new Date(2020, 8, 13);
  expect(getSeasonStatusId(season, today)).toEqual(SEASON_STARTED);
});

test("Should show a season that has ended", () => {
  let today = new Date(2021, 8, 13);
  expect(getSeasonStatusId(season, today)).toEqual(SEASON_ENDED);
});
