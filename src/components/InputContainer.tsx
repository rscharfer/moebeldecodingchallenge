import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as RightArrow } from "../svgs/next.svg";

type InputContainerProps = {
  selectCity: (prop: string) => void;
  labelText: string;
  className: string;
  focusHandler: () => void;
  blurHandler: () => void;
};

const StyledInput = styled.input`
  display: block;
  height: 3.625rem;
  width: 94%;
  outline: none;
  border: 0;
  border-radius: 0.75rem;
  box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.2);
  margin: 1rem auto 1rem;

  font-size: 1.5rem;
  color: rgb(43, 18, 2);
  text-align: center;
  font-family: Roboto-Regular;
`;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledSubmit = styled(RightArrow)`
  position: absolute;
  right: 4rem;
  top: 2rem;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  color: rgb(43, 18, 2);
  display: block;
  width: 94%;
  margin: 1rem auto 0;
`;

const InputContainer = ({
  selectCity,
  labelText,
  className,
  focusHandler,
  blurHandler,
}: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={className} onFocus={focusHandler} onBlur={blurHandler}>
      <StyledLabel htmlFor="city">{labelText}</StyledLabel>
      <StyledDiv>
        <StyledInput
          id="city"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <StyledSubmit
          height="30"
          onClick={(event) => {
            console.log("click");
            selectCity(inputValue);
          }}
        />
      </StyledDiv>
    </div>
  );
};

const StyledDefault = styled(InputContainer)`
  display: flex;
  flex-direction: column;
`;

export default StyledDefault;
