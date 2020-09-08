import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORANGE, TEAL } from "../constants/colors.js";
import weatherUtils from "../utils/weatherUtils";

import App from "../components/App";
import InputContainer from "../components/InputContainer";

jest.mock("../utils/weatherUtils");
weatherUtils.getCurrentWeatherData.mockImplementation(() => Promise.resolve(8));
weatherUtils.getForecastData.mockImplementation(() => Promise.resolve(10));

describe("<App/>", () => {
  test("app should render without breaking", () => {
    render(<App />);
  });
  test("the initial background should be orange", () => {
    render(<App />);
    // I apologize for this. :( toHaveStyle() and other alternatives did not seem to work
    // to check for the background color. And snapshots will just show you something has changed. This will work because the value of the attribute
    // will stay in sync with the actual background color.  HOW DID YOU DO THIS?

    const testElement = screen.getByTestId("justForTesting");
    expect(testElement.getAttribute("data-backgroundcolor")).toBe(ORANGE);
  });
  test("when a warm city is retrieved, the background should be orange", () => {
    // render(<App />);
    // // I apologize for this. toHaveStyle() and other alternatives did not seem to work
    // // to check for the background color.  This will work because the value of the attribute
    // // will stay in sync with the actual background color.  HOW DID YOU DO THIS?
    // const testElement = screen.getByTestId("justForTesting");
    // expect(testElement.getAttribute("data-backgroundcolor")).toBe(ORANGE);
  });
});
