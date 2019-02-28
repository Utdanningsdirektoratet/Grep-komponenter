import React from "react";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, JssProvider } from "../src";
import { createGlobalStyle } from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import colors from "../src/styling/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.white
    },
    secondary: {
      main: colors.secondary
    },
    background: {
      default: colors.white
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"].join(",")
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "inherit"
      }
    },
    MuiChip: {
      avatar: {
        fontSize: 14
      }
    },
    MuiDialog: {
      paper: {
        minWidth: "45rem"
      }
    }
  }
});

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
    <ThemeProvider theme={theme}>
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
