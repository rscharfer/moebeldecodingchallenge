import React from "react";
import axios from "axios";

import { render } from "@testing-library/react";

import App from "../components/App";
const RAW_CURRENT_WEATHER_RESPONSE_SUCCESS = {
  data: {
    main: {
      temp: 40,
    },
    weather: [
      {
        main: "Clouds",
      },
    ],
  },
  status: 200,
  statusText: "OK",
};

const RAW_FORECAST_WEATHER_SUCCESS = {
  status: 200,
  statusText: "OK",
  data: {
    list: [
      { dt: 1604077200, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
      { dt: 1604163600, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
      { dt: 1604250000, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
      { dt: 1604336400, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
      { dt: 1604422800, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
      { dt: 1604509200, temp: { day: 5.2 }, weather: [{ main: "Clouds" }] },
    ],
  },
};

// jest.mock("axios");

describe("<App/>", () => {
  test("app should render without breaking", async () => {
    // axios.get.mockImplementation(() =>
    //   Promise.resolve(RAW_CURRENT_WEATHER_RESPONSE_SUCCESS)
    // );
    // axios.get.mockImplementationOnce(() =>
    //   Promise.resolve(RAW_FORECAST_WEATHER_SUCCESS)
    // );

    //   axios.get.mockImplementationOnce(() =>
    //   Promise.resolve(RAW_FORECAST_WEATHER_SUCCESS)
    // );
    // axios.get.mockImplementation(() =>
    //   Promise.resolve(RAW_CURRENT_WEATHER_RESPONSE_SUCCESS)
    // );
    render(<App />);
    //await wait();
  });
});
