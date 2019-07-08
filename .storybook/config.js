import React from "react";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, StylesProvider } from "../src";
import { createGlobalStyle } from "styled-components";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Colors from "../src/styling/Colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: Colors.cyan,
            contrastText: Colors.white
        },
        secondary: {
            main: Colors.lightBlue
        },
        background: {
            default: Colors.white
        }
    },
    typography: {
        useNextVariants: true,
        fontSize: 16,
        fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"].join(
            ","
        )
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
    font-size: 14px;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  #root {
    display: flex;
    flex: 1 1 0%;
    height: 100%;
  }
`;

const Decorator = story => (
    <StylesProvider>
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
    </StylesProvider>
);

addDecorator(Decorator);

const req = require.context("../src/components", true, /\.stories\.tsx$/);

function loadStories() {
    require("../src/stories");
    req.keys().forEach(req);
}

configure(loadStories, module);
