import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Colors from '../src/styling/Colors';
import '../src/styling/globalStyles.css';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const theme = createTheme({
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
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 'inherit',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        avatar: {
          fontSize: 14,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minWidth: '45rem',
        },
      },
    },
  },
});

const store = createStore(() => {});

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  ),
];
