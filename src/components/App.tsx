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
  const [hasBlur, setHasBlur] = React.useState(false);
  const [currentTemp, setCurrentTemp] = React.useState(15);
  const inputContainer = useRef<HTMLDivElement>(null);

  const memoizedSetCurrentTemp = React.useCallback(
    (temp) => setCurrentTemp(temp),
    [setCurrentTemp]
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
      <ErrorBoundary
        onReset={() => setSubmittedCity("Chicago")}
        FallbackComponent={ErrorMessage}
      >
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
        />
        <ModalContainer data-testid="maybeBlurryElement" hasBlur={hasBlur}>
          <CurrentConditions
            onTempChange={memoizedSetCurrentTemp}
            submittedCity={submittedCity}
          />
          <List submittedCity={submittedCity} className="" />
        </ModalContainer>
      </ErrorBoundary>
    </div>
  );
}

export default App;
