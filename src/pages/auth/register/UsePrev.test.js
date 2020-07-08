import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { UsePrev } from "./UsePrev";

test("Should show previous call sign click both buttons", () => {
  const previousCallSign = "ThunderBear";
  const onYes = jest.fn();
  const onNo = jest.fn();
  render(
    <UsePrev
      previousCallSign={previousCallSign}
      onYes={onYes}
      onNo={onNo}
      knowResult={true}
    />
  );
  expect(screen.queryByText(previousCallSign)).toBeInTheDocument();
  fireEvent.click(screen.queryByText("Yes"));
  expect(onYes).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("No")).not.toBeInTheDocument();
});

test("Should show previous call sign click both buttons", () => {
  const previousCallSign = "ThunderBear";
  const onYes = jest.fn();
  const onNo = jest.fn();
  render(
    <UsePrev
      previousCallSign={previousCallSign}
      onYes={onYes}
      onNo={onNo}
      knowResult={true}
    />
  );
  expect(screen.queryByText(previousCallSign)).toBeInTheDocument();
  fireEvent.click(screen.queryByText("No"));
  expect(onNo).toHaveBeenCalledTimes(1);
  expect(screen.queryByText("Yes")).not.toBeInTheDocument();
});
