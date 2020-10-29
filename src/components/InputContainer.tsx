import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as RightArrow } from "../svgs/next.svg";

type InputContainerProps = {
  selectCity: (city: string) => void;
  labelText: string;
  refNode: any;
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

  @media (max-width: 768px) {
    right: 2rem;
  }
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
  refNode,
}: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Wrapper>
      <StyledLabel htmlFor="city">{labelText}</StyledLabel>
      <StyledDiv ref={refNode}>
        <StyledInput
          id="city"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") selectCity(inputValue);
          }}
          value={inputValue}
          name="stadt"
          autoComplete="off"
        />
        <StyledSubmit
          height="30"
          onClick={(event) => {
            event.preventDefault();
            selectCity(inputValue);
          }}
        />
      </StyledDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default InputContainer;
