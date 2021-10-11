import * as React from 'react';
import { render } from '@testing-library/react';

import MainLayout from './MainLayout';

describe('MainLayout', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <div data-testid="container">
        <MainLayout>
          <p>test</p>
        </MainLayout>
      </div>,
    );

    expect(getByText(/test/i)).toBeVisible();

    const layout = getByTestId('container').firstChild;
    expect(layout).toHaveStyle({
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    });
  });
});
