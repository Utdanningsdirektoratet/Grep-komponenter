import * as React from 'react';
import { render } from '@testing-library/react';

import AppBar from './AppBar';

describe('AppBar', () => {
  it('should render correctly', () => {
    render(<AppBar />);
  });
});
