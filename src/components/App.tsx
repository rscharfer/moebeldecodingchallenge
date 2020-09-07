import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import CurrentConditions from "./CurrentConditions";
import InputContainer from "./InputContainer";
import List from "./List";
import ErrorMessage from "./Error";

import { ActionTypes, ActionObject } from "../types/reducer";

import { getCurrentWeatherData, getForecastData } from "../utils/weatherUtils";

import { INIT_STATE, reducer } from "../utils/reducerUtils";
import { ORANGE, TEAL } from "../constants/colors";
import { RetrievalTypes } from "../types/weatherapi";

// import useHasMounted from "../hooks/useHasMounted";

type ModalContainerProps = {
  weatherRetrievalStatus: RetrievalTypes;
};

const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  &::before {
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    border-radius: 0.25rem;
    content: "";
    opacity: 0.55;
    z-index: 1000;
    display: ${({ weatherRetrievalStatus }) =>
      weatherRetrievalStatus === "inputHasFocus" ||
      weatherRetrievalStatus === "retrievingData"
        ? "block"
        : "none"};
  }


  &::after {
    animation: loading 1s infinite ease-out;
    position: absolute;
    top: calc(50% - 3rem);
    left: calc(50% - 3rem);
    width: 6rem;
    height: 6rem;
    background: radial-gradient(rgba(0, 55, 255, 0), rgba(0, 55, 255, 0.75));
    border-radius: 50%;
    content: "";
    display: ${({ weatherRetrievalStatus }) =>
      weatherRetrievalStatus === "retrievingData" ? "block" : "none"};
  }

  @keyframes loading {
    from {
      opacity: 1;
      transform: scale(0.001);
    }
    to {
      opacity: 0;
      transform: scale(1);
    }
  }
`;

function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  const sendAction = (type: ActionTypes) => (payload: {
    [prop: string]: any;
  }) => {
    dispatch({ type, ...payload } as ActionObject);
  };

  const sendRetrievalAction = sendAction("weatherRetrievalStatusChange");

  const selectCityHandler: (city: string) => void = (city) =>
    dispatch({
      type: "submittedCitySet",
      submittedCity: city,
    });

  const inputFocusHandler = () => {
    if (store.weatherRetrievalStatus !== "retrievingData") {
      sendRetrievalAction({ status: "inputHasFocus" });
    }
  };

  const inputBlurHandler = () => {
    if (store.weatherRetrievalStatus !== "retrievingData") {
      sendRetrievalAction({ status: "idle" });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (store.submittedCity !== "Fake City, USA") {
        try {
          sendRetrievalAction({ status: "retrievingData" });

          // const timeLimit = () => new Promise((res, rej) => setTimeout(rej, 3000))
          const [current, forecast] = await Promise.all([
            getCurrentWeatherData(store.submittedCity),
            getForecastData(store.submittedCity),
          ]);

          dispatch({
            type: "dataRetrievalSuccessful",
            currentTemp: current.temp,
            currentSkies: current.skies,
            forecast,
          });
        } catch (e) {
          dispatch({
            type: "dataRetrievalFailed",
            message: e.message,
          });
        }
      }
    }
    fetchData();
    // I do not want to make sendRetrievalAction a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ModalContainer weatherRetrievalStatus={store.weatherRetrievalStatus}>
        <CurrentConditions
          temp={currentTemp}
          skies={currentSkies}
          selectedCity={submittedCity}
        />
        <List forecast={forecast} className="" />
      </ModalContainer>
      {store.hasError && (
        <ErrorMessage message={store.errorMessage} className="" />
      )}
    </>
  );
}

export default App;
