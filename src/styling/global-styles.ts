import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    padding: 0;
  }

  #root {
    display: flex;
    flex: 1 1 0%;
    height: 100%;
  }
`;

export default GlobalStyle;
