import React, { Component } from 'react';

import { ThemeProvider, Theme } from 'grep-component-lib';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        {/* Add the code you want to test here */}
      </ThemeProvider>
    );
  }
}
