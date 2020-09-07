import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../svgs/logo.svg";

type HeaderProps = {
  text: string;
};

const StyledHeaderContainer = styled.div`
  & > div {
    font-weight: 800;
    margin-top: -1.25rem;
    font-size: .75rem;
  }
  margin-bottom:1rem;
`;

const Header = ({ text }: HeaderProps) => (
  <StyledHeaderContainer>
    <Logo />
    <div>{text}</div>
  </StyledHeaderContainer>
);

export default Header;
