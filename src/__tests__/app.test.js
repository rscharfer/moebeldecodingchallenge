import React from "react";
import { render, screen } from "@testing-library/react";

import { ORANGE } from "../colors.js";

import App from "../App";

describe("app should work", () => {
  test("app renders with correct default color", () => {
    render(<App />);
    const body = document.querySelector("body");
    expect(body).toHaveStyle(`background: ${ORANGE};`);
  });
});
