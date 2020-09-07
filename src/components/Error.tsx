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
  color
  font-size: 64px;
`;

export default StyledErrorMessage;
