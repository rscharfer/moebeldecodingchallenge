import React, { useRef } from "react";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import CurrentConditions from "./CurrentConditions";
import InputContainer from "./InputContainer";
import List from "./List";
import ErrorMessage from "./Error";

import { ORANGE, TEAL } from "../constants/colors";

type ModalContainerProps = {
  hasBlur: boolean;
};

const ModalContainer = styled.div<ModalContainerProps>`
  transition: filter 0.4s ease;
  filter: blur(${({ hasBlur }) => (hasBlur ? "5px" : "0")});
`;

const getBackgroundGradient = (temp: number): string =>
  temp < 15 ? TEAL : ORANGE;

function App() {
  const [submittedCity, setSubmittedCity] = React.useState("Chicago");
  const [hasBlur, setHasBlur] = React.useState(false);
  const [currentTemp, setCurrentTemp] = React.useState(15);
  const input = useRef<HTMLDivElement>(null!).current;

  const memoizedSetCurrentTemp = React.useCallback(
    (temp) => setCurrentTemp(temp),
    [setCurrentTemp]
  );

  const selectCityHandler = (city: string) => {
    setSubmittedCity(city);
  };

  const appClickHandler = (event: any) => {
    if (event.target.contains(input)) setHasBlur(true);
    else setHasBlur(false);
  };

  const gradient = getBackgroundGradient(currentTemp);

  return (
    <Wrapper onClick={appClickHandler} gradient={gradient}>
      <GlobalStyle />
      <ErrorBoundary
        onReset={() => setSubmittedCity("Chicago")}
        FallbackComponent={ErrorMessage}
      >
        <Header text="whatweather?" />
        <InputContainer
          refNode={input}
          labelText="Type in your location and we will tell you what weather to expect"
          selectCity={selectCityHandler}
        />
        <ModalContainer data-testid="maybeBlurryElement" hasBlur={hasBlur}>
          <CurrentConditions
            onTempChange={memoizedSetCurrentTemp}
            submittedCity={submittedCity}
          />
          <List submittedCity={submittedCity} />
        </ModalContainer>
      </ErrorBoundary>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ gradient: string }>`
  background: ${(props) => props.gradient};
  height: 100vh;
  padding: 8px;
`;

export default App;
