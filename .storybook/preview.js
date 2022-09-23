import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
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
          <BrowserRouter>
            <CssBaseline />
            <Story />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  ),
];
