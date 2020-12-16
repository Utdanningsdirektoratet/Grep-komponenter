import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import Colors from '../src/styling/Colors';
import '../src/styling/globalStyles.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.cyan,
      contrastText: Colors.white,
    },
    secondary: {
      main: Colors.orange,
    },
    background: {
      default: Colors.white,
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'].join(
      ',',
    ),
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 'inherit',
      },
    },
    MuiChip: {
      avatar: {
        fontSize: 14,
      },
    },
    MuiDialog: {
      paper: {
        minWidth: '45rem',
      },
    },
  },
});

const store = createStore(() => {});

const Decorator = (story) => (
  <Provider store={store}>
    <StylesProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {story()}
      </MuiThemeProvider>
    </StylesProvider>
  </Provider>
);

addDecorator(Decorator);

const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  require('../src/stories');
  req.keys().forEach(req);
}

configure(loadStories, module);
