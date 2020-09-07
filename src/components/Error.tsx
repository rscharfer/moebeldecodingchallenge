import React from "react";
import styled from "styled-components";

type ErrorMessageProps = {
  message: string;
  className: string;
};

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  return <div className={className}>{message}</div>;
};

const StyledErrorMessage = styled(ErrorMessage)`
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
`;

export default StyledErrorMessage;
