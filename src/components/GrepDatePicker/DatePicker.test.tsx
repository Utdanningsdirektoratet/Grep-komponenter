import * as React from 'react';
import { render } from '@testing-library/react';

import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('should render correctly', () => {
    render(<DatePicker onChange={console.log} />);
  });
});
