import React from 'react';
import { render } from '@testing-library/react';

import CircularLoading from '..';

describe('CircularLoading', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<CircularLoading />);

    expect(getByRole('progressbar')).toBeVisible();
  });

  it('should render correctly with custom height', () => {
    const { getByRole } = render(<CircularLoading height={400} />);

    expect(getByRole('progressbar').parentNode).toHaveStyle({
      height: '400px',
    });
  });
});
