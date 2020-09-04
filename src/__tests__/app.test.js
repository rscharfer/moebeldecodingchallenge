import React from "react";
import { render, screen, userEvent } from "@testing-library/react";

import { ORANGE, TEAL } from "../colors.js";

import App from "../App";

describe("app should work", () => {
  test("app renders with correct default color", () => {
    render(<App />);
    const body = document.querySelector("body");
    expect(body).toHaveStyle(`background: ${ORANGE};`);
  });
  // test("app has background color of teal when cold temp is returned from API", async () => {
  //   render(<App />);
  //   await userEvent.type(screen.getByRole('textbox'), 'Cold City')
  //   // mock returns cold current temp
  //   const body = document.querySelector("body");
  //   expect(body).toHaveStyle(`background: ${TEAL};`);
  // });
  // test("app has background color of orange was warm temp is returned from API", async () => {
  //   render(<App />);
  //   await userEvent.type(screen.getByRole('textbox'), 'Warm City')
  //   // mock returns cold current temp
  //   const body = document.querySelector("body");
  //   expect(body).toHaveStyle(`background: ${ORANGE};`);
  // });
});
