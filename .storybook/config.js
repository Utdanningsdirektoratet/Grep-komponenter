import React from "react";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, Theme, JssProvider } from "../src";
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

const Decorator = story => (
  <JssProvider>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          flex: "1 1 0%"
        }}
      >
        {story()}
      </div>
    </ThemeProvider>
  </JssProvider>
);

addDecorator(Decorator);

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
