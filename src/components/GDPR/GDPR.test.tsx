import * as React from 'react';
import { render } from '@testing-library/react';

import GDPR from './GDPR';

describe('GDPR', () => {
  it('should render correctly', () => {
    const { getByText } = render(<GDPR>Test content</GDPR>);

    expect(
      getByText(/personlig informasjon og personvern/i),
    ).toBeInTheDocument();
    expect(getByText(/test content/i)).toBeInTheDocument();
  });
});
