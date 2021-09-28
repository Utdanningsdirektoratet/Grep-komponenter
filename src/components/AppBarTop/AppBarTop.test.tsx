import * as React from 'react';
import { render, screen } from '@testing-library/react';

import AppBarTop from './AppBarTop';

describe('AppBarProfile', () => {
  it('should render correctly', () => {
    render(
      <div data-testid="container">
        <AppBarTop>
          <p>Child #1</p>
          <p>Child #2</p>
          <p>Child #3</p>
        </AppBarTop>
      </div>,
    );

    const appBarTop = screen.getByTestId('container').firstChild;

    expect(appBarTop).toBeVisible();

    expect(appBarTop?.childNodes.length).toBe(3);
  });
});
