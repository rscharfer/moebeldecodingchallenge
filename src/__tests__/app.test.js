import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "axios";

import { ORANGE, TEAL } from "../colors.js";

import App from "../App";
import InputContainer from "../InputContainer";



jest.mock("axios");
// TODO: create two functions we can mock which returns a promise that resolves to the cleaned up data

axios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      main: {
        temp: 10,
      },
      weather: [{ main: "cloudy" }],
    },
  })
);

// mock for forecast
axios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      list: [
        {
          dt: 30300303,
          temp: {
            day: 34,
          },
          weather: [
            {
              main: "rainy",
            },
          ],
        },
      ],
    },
  })
);

describe("app should work", () => {
  test.todo("app has correct initial background color", () => {
 
  });
  test.todo('when api returns warm current temp, render orange background')
  test.todo('when api returns cool current temp, render teal background')
});
