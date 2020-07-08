import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Login } from "./Login";

describe("Should show the right page", () => {
  test("should show form first", () => {
    render(<Login />);
    expect(
      screen.queryByLabelText("call sign", { exact: false })
    ).toBeInTheDocument();
  });
  test("should show forgot password", () => {
    render(<Login />);
    fireEvent.click(screen.queryByText("Forgot password", { exact: false }));
    expect(screen.queryByText("Password recovery email")).toBeInTheDocument();
    fireEvent.click(screen.queryByText("Back"));
    expect(
      screen.queryByText("call sign", { exact: false })
    ).toBeInTheDocument();
  });
  test("should show account closed", () => {
    const connections = [
      {
        card1: { kind: "white", text: "OpenFrameworks" },
        card2: { kind: "red", text: "Huawei" },
        createdAt: new Date(2020, 6, 1),
      },
      {
        card1: { kind: "red", text: "Computing" },
        card2: { kind: "red", text: "Huawei" },
        createdAt: new Date(2020, 6, 2),
      },
      {
        card1: { kind: "red", text: "Text-based UI" },
        card2: { kind: "red", text: "Huawei" },
        createdAt: new Date(2020, 6, 3),
      },
    ];
    render(<Login user={{ closed: true }} connections={connections} />);
    expect(screen.queryByText("closed", { exact: false })).toBeInTheDocument();
  });
  test("should show confirm email", () => {
    render(<Login user={{ verified: false }} />);
    expect(
      screen.queryByText("We've sent you an email", { exact: false })
    ).toBeInTheDocument();
  });
});
