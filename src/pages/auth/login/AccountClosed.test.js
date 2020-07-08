import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AccountClosed } from "./AccountClosed";

test("Should display inappropriate connections", () => {
  const connections = [
    {
      id: 1,
      card1: { kind: "white", text: "OpenFrameworks" },
      card2: { kind: "red", text: "Huawei1" },
      createdAt: new Date(2020, 6, 1),
    },
    {
      id: 2,
      card1: { kind: "red", text: "Computing" },
      card2: { kind: "red", text: "Huawei2" },
      createdAt: new Date(2020, 6, 2),
    },
    {
      id: 3,
      card1: { kind: "red", text: "Text-based UI" },
      card2: { kind: "red", text: "Huawei3" },
      createdAt: new Date(2020, 6, 3),
    },
  ];
  render(<AccountClosed connections={connections} />);
  for (let c of connections) {
    expect(screen.queryByText(c.card1.text)).toBeInTheDocument();
    expect(screen.queryByText(c.card1.text)).toHaveClass(c.card1.kind);
    expect(screen.queryByText(c.card2.text)).toBeInTheDocument();
    expect(screen.queryByText(c.card2.text)).toHaveClass(c.card2.kind);
  }
});
