import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Colors from '../src/styling/Colors';
import '../src/styling/globalStyles.css';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

/* Added to suspend a console warning(error): 
The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. 
Try changing it to ":first-of-type" */
muiCache.compat = true;

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
    divider: Colors.green,
  },
  typography: {
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

// Use the legacy store, in order to not add redux-toolkit as an extra dependency.
const store = createStore(() => {
  return;
});

export const decorators = [
  (Story) => {
    const router = createBrowserRouter([
      {
        path: '*',
        element: <Story />,
      },
    ]);
    return (
      <Provider store={store}>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    );
  },
];
export const tags = ['autodocs'];
