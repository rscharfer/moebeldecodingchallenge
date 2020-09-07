import React, { useReducer, useEffect } from "react";
import axios from "axios";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import CurrentConditions from "./CurrentConditions";
import InputContainer from "./InputContainer";
import List from "./List";

import {
  cleanUpCurrentWeatherData,
  cleanUpForecastData,
  createCurrentWeatherUrl,
  createForcastUrl,
} from "../utils/weatherUtils";

import { INIT_STATE, reducer } from "../utils/reducerUtils";
import { ORANGE, TEAL } from "../constants/colors";

import useHasMounted from "../hooks/useHasMounted";

function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);
  const hasMounted = useHasMounted();

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  const selectCityHandler: (city: string) => void = (city) =>
    dispatch({
      type: "submittedCitySet",
      submittedCity: city,
    });

  const inputFocusHandler = () => {
    console.log("input focussed!");
  };

  const inputBlurHandler = () => {
    console.log("input blurred!");
  };

  useEffect(() => {
    async function fetchData() {
      if (hasMounted) {
        try {
          const currentProm = axios.get(
            createCurrentWeatherUrl(store.submittedCity)
          );

          const forecastProm = axios.get(createForcastUrl(store.submittedCity));

          // const timeLimit = () => new Promise((res, rej) => setTimeout(rej, 3000))
          const [current, forecast] = await Promise.all([
            currentProm,
            forecastProm,
          ]);
          const { temp, skies } = cleanUpCurrentWeatherData(current.data);
          const forecastData = cleanUpForecastData(forecast.data);

          dispatch({
            type: "dataRetrievalSuccessful",
            currentTemp: temp,
            currentSkies: skies,
            forecast: forecastData,
          });
        } catch (e) {
          dispatch({
            type: "dataRetrievalFailed",
          });
        }
      }
    }
    fetchData();
  }, [hasMounted, store.submittedCity]);

  const { currentTemp, currentSkies, submittedCity, forecast } = store;

  return (
    <>
      <GlobalStyle bgColor={getBackgroundColor(currentTemp)} />
      <Header text="whatweather?" />
      <InputContainer
        labelText="Type in your location and we will tell you what weather to expect"
        selectCity={selectCityHandler}
        blurHandler={inputBlurHandler}
        focusHandler={inputFocusHandler}
        className=""
      />
      <CurrentConditions
        temp={currentTemp}
        skies={currentSkies}
        selectedCity={submittedCity}
      />
      <List forecast={forecast} />
    </>
  );
}

export default App;
