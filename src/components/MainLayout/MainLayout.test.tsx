import * as React from 'react';
import { render } from '@testing-library/react';

import MainLayout from './MainLayout';

describe('MainLayout', () => {
  it('should render correctly', () => {
    render(
      <MainLayout>
        <p>test</p>
      </MainLayout>,
    );
  });
});
