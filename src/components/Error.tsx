import React from "react";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  text-align: center;
  color: tomato;
  background-color: white;
  border: 3px solid tomato;
  border-radius: 0.75rem;
  width: 20%;
  position: absolute;
  top: calc(50vh - 2.5rem);
  left: calc(50vw - 10%);
  font-size: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 40%;
    left: calc(50vw - 25%);
  }
`;

const ErrorMessage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <StyledErrorMessage role="alert">
      <code>{error?.message}</code>
      <button
        style={{
          border: "2px solid tomato",
          borderRadius: "4px",
          lineHeight: "20px",
          backgroundColor: "white",
          color: "tomato",
          fontFamily: "monospace",
          cursor: 'pointer'
        }}
        onClick={resetErrorBoundary}
      >
        Reset
      </button>
    </StyledErrorMessage>
  );
};

export default ErrorMessage;
