import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '../src';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Colors from '../src/styling/Colors';
import '../src/styling/globalStyles.css';

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

const Decorator = story => (
  <StylesProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {story()}
    </MuiThemeProvider>
  </StylesProvider>
);

addDecorator(Decorator);

const req = require.context('../src/components', true, /\.stories\.tsx$/);

function loadStories() {
  require('../src/stories');
  req.keys().forEach(req);
}

configure(loadStories, module);
