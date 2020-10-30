import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, waitFor, screen } from "@testing-library/react";

import App from "../components/App";

const RAW_CURRENT_WEATHER_RESPONSE_SUCCESS = {
  main: {
    temp: 40,
  },
  weather: [
    {
      main: "Clouds",
    },
  ],
};

const RAW_FORECAST_WEATHER_SUCCESS = {
  list: [
    { dt: 1604077200, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    { dt: 1604163600, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    { dt: 1604250000, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    { dt: 1604336400, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    { dt: 1604422800, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    { dt: 1604509200, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
  ],
};

const current_weather_endpoint =
  "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=bffa691e3dc38de5ea81dae512fdb94a&units=metric";

const forecast_weather_endpoint =
  "https://api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&cnt=6&appid=bffa691e3dc38de5ea81dae512fdb94a&units=metric";

const server = setupServer(
  rest.get(current_weather_endpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(RAW_CURRENT_WEATHER_RESPONSE_SUCCESS));
  }),
  rest.get(forecast_weather_endpoint, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(RAW_FORECAST_WEATHER_SUCCESS));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<App/>", () => {
  test("app should fetch weather data and render it to the screen", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("40"));
  });
});
