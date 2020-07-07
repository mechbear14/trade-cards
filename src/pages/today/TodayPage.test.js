import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TodayPage } from "./TodayPage";

const signedInUser = {
  callSign: "ThunderBear",
  assignedCard: { kind: "white", text: "SYCL" },
  responded: false,
  // unresponseStreak: 0, Server side only
  response: null,
  // respondedAt: null, Server side only
};

const signedInUser2 = {
  callSign: "ThunderBear",
  assignedCard: { kind: "white", text: "SYCL" },
  responded: true,
  response: {
    card1: { kind: "white", text: "SYCL" },
    card2: { kind: "red", text: "Computing" },
  },
};

const renderUser = (user) => {
  render(
    <TodayPage
      callSign={user.callSign}
      assignedCard={user.assignedCard}
      responded={user.responded}
      response={user.response}
    />
  );
};

describe("Should show the right page", () => {
  test("Should show user call sign and respond page", () => {
    const user = signedInUser;
    renderUser(user);
    expect(
      screen.queryByText(signedInUser.callSign, { exact: false })
    ).toBeInTheDocument();
    expect(screen.queryByText("Your response")).toBeInTheDocument();
  });
  test("should show user call sign and respond complete page", () => {
    const user = signedInUser2;
    renderUser(user);
    expect(
      screen.queryByText(signedInUser.callSign, { exact: false })
    ).toBeInTheDocument();
    expect(screen.queryByText(/You have responded/)).toBeInTheDocument();
    expect(screen.queryByText(user.response.card1.text)).toBeInTheDocument();
    expect(screen.queryByText(user.response.card1.text)).toHaveClass(
      user.response.card1.kind
    );
    expect(screen.queryByText(user.response.card2.text)).toBeInTheDocument();
    expect(screen.queryByText(user.response.card2.text)).toHaveClass(
      user.response.card2.kind
    );
  });
});
