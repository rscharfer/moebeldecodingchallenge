import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: Roboto, sans-serif;
    background: ${(props: { bgColor?: string }) => props.bgColor};
    height: 100%;
    font-size: 18px;
  }
`;

export default GlobalStyle;
