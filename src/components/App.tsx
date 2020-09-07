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

// import useHasMounted from "../hooks/useHasMounted";

function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  // const sendAction => type => payload => ({
  //   type,
  //   ...payload
  // })

  const selectCityHandler: (city: string) => void = (city) =>
    dispatch({
      type: "submittedCitySet",
      submittedCity: city,
    });

  const inputFocusHandler = () => {
    if (store.weatherRetrievalStatus !== "retrievingData") {
      dispatch({
        type: "weatherRetrievalStatusChange",
        status: "inputHasFocus",
      });
    }
  };

  const inputBlurHandler = () => {
    if (store.weatherRetrievalStatus !== "retrievingData") {
      dispatch({
        type: "weatherRetrievalStatusChange",
        status: "idle",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (store.submittedCity !== "Fake City, USA") {
        try {
          dispatch({
            type: "weatherRetrievalStatusChange",
            status: "retrievingData",
          });
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

          console.log(forecastData);

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
  }, [store.submittedCity]);

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
