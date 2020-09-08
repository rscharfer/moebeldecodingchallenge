import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORANGE, TEAL } from "../constants/colors.js";
import weatherUtils from "../utils/weatherUtils";

import App from "../components/App";
import InputContainer from "../components/InputContainer";

jest.mock("../utils/weatherUtils");
weatherUtils.getCurrentWeatherData.mockImplementation(() =>
  Promise.resolve({
    temp: 22,
    skies: "Clouds",
  })
);

weatherUtils.getForecastData.mockImplementation(() =>
  Promise.resolve([
    { day: "Tuesday", temp: 18.47, skies: "Rain" },
    { day: "Wednesday", temp: 19.18, skies: "Rain" },
    { day: "Thursday", temp: 16.41, skies: "Clouds" },
    { day: "Friday", temp: 18.07, skies: "Clear" },
    { day: "Saturday", temp: 21.25, skies: "Rain" },
  ])
);

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
  test("when a {city} is entered into input, and submitted, it appears as 'Weather for: {city}'", () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Weather for: Hamburg")).not.toBeNull();
    screen.debug();
  });
});
