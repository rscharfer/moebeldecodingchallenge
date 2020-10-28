import React, { useRef } from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import CurrentConditions from "./CurrentConditions";
import InputContainer from "./InputContainer";
import List from "./List";
import ErrorMessage from "./Error";
import { useFetcher } from "../hooks/useFetcher";

import {
  createCurrentWeatherUrl,
  createForcastUrl,
  cleanUpCurrentWeatherData,
  cleanUpForecastData,
} from "../utils/weatherUtils";

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
  const [submittedCity, setSubmittedCity] = React.useState("Chicago");
  const [hasBlur, setHasBlur] = React.useState(true);
  const inputContainer = useRef<HTMLDivElement>(null);

  const { status: cwStatus, data: cwData, error: cwError } = useFetcher(
    { currentTemp: 20, currentSkies: "Clouds" },
    createCurrentWeatherUrl(submittedCity),
    cleanUpCurrentWeatherData
  );


  const { temp: currentTemp, skies: currentSkies } = cwData;

  const { status: fstatus, data: forecast, error: ferror } = useFetcher(
    [
      { day: "Tuesday", temp: 18.47, skies: "Rain" },
      { day: "Wednesday", temp: 19.18, skies: "Rain" },
      { day: "Thursday", temp: 16.41, skies: "Clouds" },
      { day: "Friday", temp: 18.07, skies: "Clear" },
      { day: "Saturday", temp: 21.25, skies: "Rain" },
    ],
    createForcastUrl(submittedCity),
    cleanUpForecastData
  );

  const getBackgroundColor = (temp: number): string =>
    temp < 15 ? TEAL : ORANGE;

  const selectCityHandler: (city: string) => void = (city) => {
    setSubmittedCity(city);
  };

  const appClickHandler = (event: any) => {
    if (hasAncestor(event.target, inputContainer.current as HTMLDivElement)) {
      setHasBlur(true);
    } else setHasBlur(false);
  };

  return (
    <div onClick={appClickHandler}>
      <GlobalStyle bgColor={getBackgroundColor(currentTemp)} />
      <div
        data-testid="backgroundColorDocumenter"
        data-backgroundcolor={getBackgroundColor(currentTemp)}
        style={{ display: "none" }}
      />

      <Header text="whatweather?" />
      <InputContainer
        refNode={inputContainer}
        labelText="Type in your location and we will tell you what weather to expect"
        selectCity={selectCityHandler}
        className=""
      />
      <ModalContainer data-testid="maybeBlurryElement" hasBlur={hasBlur}>
        <CurrentConditions
          temp={currentTemp}
          skies={currentSkies}
          selectedCity={submittedCity}
        />
        <List forecast={forecast} className="" />
      </ModalContainer>
      {ferror && <ErrorMessage message={ferror.message} className="" />}
    </div>
  );
}

export default App;
