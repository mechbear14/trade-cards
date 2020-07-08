import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Register } from "./Register";

describe("Should go to the right page", () => {
  test("Should start on the form", () => {
    render(<Register />);
    expect(screen.queryByLabelText("Password")).toBeInTheDocument();
  });
  test("Should go to email confirmation", () => {
    render(<Register user={{ verified: false }} />);
    expect(
      screen.queryByLabelText("We've sent you an email", { exact: false })
    ).toBeInTheDocument();
  });
  test("Should ask whether to use previous account", () => {
    render(
      <Register
        user={{ previous: { callSign: "ThunderBear", closed: false } }}
      />
    );
    expect(
      screen.queryByText("this previous account", { exact: false })
    ).toBeInTheDocument();
  });
});