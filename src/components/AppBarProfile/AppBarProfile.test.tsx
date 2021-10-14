import * as React from 'react';
import { render } from '@testing-library/react';

import AppBarProfile from './AppBarProfile';

describe('AppBarProfile', () => {
  it('should render correctly', () => {
    render(
      <AppBarProfile fullName="" userRole="" onButtonClick={() => void 1} />,
    );
  });
});
