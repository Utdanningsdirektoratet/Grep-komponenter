import * as React from 'react';
import { render } from '@testing-library/react';

import CleanPaper from './CleanPaper';

describe('CleanPaper', () => {
  it('should render correctly', () => {
    render(<CleanPaper classes={{ root: '' }} />);
  });
});
