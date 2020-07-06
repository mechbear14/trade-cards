import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ConfirmEmail from "./ConfirmEmail";

test("Should confirm email", () => {
  const onConfirm = jest.fn();
  render(<ConfirmEmail onConfirm={onConfirm} />);
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test("Should show call sign on successful verification", () => {
  const onConfirm = jest.fn(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ callSign: "ThunderBear" });
        }, 5000);
      })
  );
  render(<ConfirmEmail onConfirm={onConfirm} />);
  expect(screen.queryByText("ThunderBear")).toBeInTheDocument();
});
