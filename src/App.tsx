import React, { useReducer, useEffect } from "react";
import GlobalStyle from "./GlobalStyle";

import { ORANGE, TEAL } from "./colors";

type Store = {
  currentSkies: string;
  currentTemp: number;
  selectedCity: string;
  forecast: object[] | [];
  weatherRetrievalStatus: "idle" | "inputHasFocus" | "retrievingData";
  hasError: boolean;
};

type actionObject = {
  type: "currentConditionsUpdateSuccessful";
  currentTemp: number;
  currentSkies: string;
  selectedCity: string;
};

const INIT_STATE: Store = {
  currentSkies: "cloudy",
  currentTemp: 15,
  selectedCity: "New York City",
  forecast: [],
  weatherRetrievalStatus: "idle",
  hasError: false,
};

const reducer = (state: Store, action: actionObject): Store => {
  switch (action.type) {
    case "currentConditionsUpdateSuccessful":
      return {
        ...state,
        currentTemp: action.currentTemp,
        currentSkies: action.currentSkies,
        selectedCity: action.selectedCity,
      };
    default:
      return state;
  }
};

function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  useEffect(() => {
    if (store.weatherRetrievalStatus === "retrievingData") {
      try {
        // fetch currentWeather
        // fetch forecast
        // if both work set the current conditions, forecast, selected city, set to idle
      } catch (e) {
        // if doesnt work, set selected city, hasError, set to idle
      }
    }
  }, [store.weatherRetrievalStatus]);

  return (
    <>
      <GlobalStyle bgColor={getBackgroundColor(store.currentTemp)} />
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div>something else</div>
    </>
  );
}

export default App;
