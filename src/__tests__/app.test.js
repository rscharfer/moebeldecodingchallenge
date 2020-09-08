import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORANGE, TEAL } from "../constants/colors.js";
import weatherUtils from "../utils/weatherUtils";

import App from "../components/App";

jest.mock("../utils/weatherUtils");

beforeEach(() => {
  weatherUtils.getCurrentWeatherData.mockResolvedValue({
    temp: 44,
    skies: "Clouds",
  });

  weatherUtils.getForecastData.mockResolvedValue([
    { day: "Tuesday", temp: 72, skies: "Rain" },
    { day: "Wednesday", temp: 19.18, skies: "Rain" },
    { day: "Thursday", temp: 16.41, skies: "Clouds" },
    { day: "Friday", temp: 18.07, skies: "Clear" },
    { day: "Saturday", temp: 21.25, skies: "Rain" },
    { day: "TestDay", temp: 21.25, skies: "Rain" },
  ]);
});

describe("<App/>", () => {
  test("app should render without breaking", () => {
    render(<App />);
  });

  test("the initial background should be orange", () => {
    render(<App />);
    // I apologize for this. :( toHaveStyle() and other alternatives did not seem to work
    // to check for the background color. And snapshots will just show you something has changed. This will work because the value of the attribute
    // will stay in sync with the actual background color.  HOW DID YOU DO THIS?
    const testElement = screen.getByTestId("backgroundColorDocumenter");
    expect(testElement.getAttribute("data-backgroundcolor")).toBe(ORANGE);
  });

  test("when a {city} is entered into input and submitted, 'Weather for: {city}' can be seen", () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Weather for: Hamburg")).not.toBeNull();
  });

  test("the data retrieved from the 'current' API is rendered to the screen", async () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    const elementWith44 = await screen.findByText("44");
    expect(elementWith44).toBeInTheDocument();
  });

  test("the data retrieved from the 'forecast' API is rendered to the screen", async () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    const elementWith72 = await screen.findByText("72");
    expect(elementWith72).toBeInTheDocument();
    const uniqueDayElement = screen.getByText("TestDay");
    expect(uniqueDayElement).toBeInTheDocument();
  });

  test("when the current weather is warm, orange background", async () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    const testElement = await screen.findByTestId("backgroundColorDocumenter");
    expect(testElement.getAttribute("data-backgroundcolor")).toBe(ORANGE);
  });

  test("when the current weather is cold, teal background", async () => {
    // override default with cold weather
    weatherUtils.getCurrentWeatherData.mockResolvedValue({
      temp: 10,
      skies: "Clouds",
    });
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.type(inputBox, "Hamburg");
    fireEvent.keyDown(inputBox, { key: "Enter", code: "Enter" });
    const testElement = await screen.findByTestId("backgroundColorDocumenter");
    expect(testElement.getAttribute("data-backgroundcolor")).toBe(TEAL);
  });

  test("there should be a blur when input has focus", async () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.click(inputBox);
    const possiblyBlurryElement = screen.getByTestId("maybeBlurryElement");
    expect(window.getComputedStyle(possiblyBlurryElement).filter).toBe(
      "blur(5px)"
    );
  });

  test("lose focus when clicked outside of box", async () => {
    render(<App />);
    const inputBox = screen.getByRole("textbox");
    userEvent.click(inputBox);
    userEvent.click(screen.getByText("Tuesday"));
    const possiblyBlurryElement = screen.getByTestId("maybeBlurryElement");
    expect(window.getComputedStyle(possiblyBlurryElement).filter).toBe(
      "blur(0)"
    );
  });
});
