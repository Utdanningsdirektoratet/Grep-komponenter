import * as React from 'react';
import { render, screen } from '@testing-library/react';

import CleanPaper from './CleanPaper';

describe('CleanPaper', () => {
  it('should render correctly without elevation', () => {
    render(
      <CleanPaper classes={{ root: '' }}>
        <div data-testid="test"></div>
      </CleanPaper>,
    );

    expect(screen.getByTestId('test')).toBeVisible();
    expect(screen.getByTestId('test').parentNode).toBeVisible();
    expect(screen.getByTestId('test').parentNode).toHaveClass(
      'MuiPaper-elevation0',
    );
    expect(screen.getByTestId('test').parentNode).not.toHaveClass(
      'MuiPaper-elevation1',
    );
  });

  it('should render correctly with elevation', () => {
    render(
      <CleanPaper classes={{ root: '' }} elevation={2}>
        <div data-testid="test"></div>
      </CleanPaper>,
    );

    expect(screen.getByTestId('test')).toBeVisible();
    expect(screen.getByTestId('test').parentNode).toBeVisible();
    expect(screen.getByTestId('test').parentNode).toHaveClass(
      'MuiPaper-elevation2',
    );
    expect(screen.getByTestId('test').parentNode).not.toHaveClass(
      'MuiPaper-elevation1',
    );
  });
});
