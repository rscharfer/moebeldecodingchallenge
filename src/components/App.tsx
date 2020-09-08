import React, { useReducer, useEffect, useRef } from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import CurrentConditions from "./CurrentConditions";
import InputContainer from "./InputContainer";
import List from "./List";
import ErrorMessage from "./Error";

import { getCurrentWeatherData, getForecastData } from "../utils/weatherUtils";

import { INIT_STATE, reducer } from "../reducer";

import { ORANGE, TEAL } from "../constants/colors";

type ModalContainerProps = {
  hasBlur: boolean;
};

const hasAncestor = (node: Node, maybeAncestorNode: Node): boolean => {
  if (node.parentNode === null) return false;
  else if (node.parentNode === maybeAncestorNode) return true;
  else return hasAncestor(node.parentNode, maybeAncestorNode);
};

const ModalContainer = styled.div<ModalContainerProps>`
  transition: filter 0.4s ease;
  filter: blur(${({ hasBlur }) => (hasBlur ? "5px" : "0")});
`;

function App() {
  const [store, dispatch] = useReducer(reducer, INIT_STATE);
  const inputContainer = useRef<HTMLDivElement>(null);

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  const selectCityHandler: (city: string) => void = (city) => {
    dispatch({
      type: "submittedCitySet",
      submittedCity: city,
    });
  };

  const appClickHandler = (event: any) => {
    if (hasAncestor(event.target, inputContainer.current as HTMLDivElement)) {
      dispatch({ type: "blurChange", to: "on" });
    } else dispatch({ type: "blurChange", to: "off" });
  };

  useEffect(() => {
    async function fetchData() {
      if (store.submittedCity !== "Fake City, USA") {
        try {
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
  }, [store.submittedCity]);

  const { currentTemp, currentSkies, submittedCity, forecast } = store;

  return (
    <div onClick={appClickHandler}>
      <GlobalStyle bgColor={getBackgroundColor(currentTemp)} />
      <div
        data-testid="justForTesting"
        data-backgroundcolor={getBackgroundColor(currentTemp)}
        style={{ display: "none" }}
      >
        Way up here
      </div>
      <Header text="whatweather?" />
      <InputContainer
        refNode={inputContainer}
        labelText="Type in your location and we will tell you what weather to expect"
        selectCity={selectCityHandler}
        className=""
      />
      <ModalContainer hasBlur={store.hasBlur}>
        <CurrentConditions
          temp={currentTemp}
          skies={currentSkies}
          selectedCity={submittedCity}
        />
        <List forecast={forecast} className="" />
      </ModalContainer>
      {store.errorMessage && (
        <ErrorMessage message={store.errorMessage} className="" />
      )}
    </div>
  );
}

export default App;
