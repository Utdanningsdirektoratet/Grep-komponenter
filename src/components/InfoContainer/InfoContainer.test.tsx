import * as React from 'react';
import { render, screen } from '@testing-library/react';

import InfoContainer, { InfoField } from '.';

const infoFields: InfoField[] = [
  {
    key: 'Field 1',
    value: 'Test 1',
  },
  {
    key: 'Field 2',
    value: 'Test 2',
  },
];

describe('InfoContainer', () => {
  it('should render correctly', () => {
    render(<InfoContainer infoFields={infoFields} />);

    expect(screen.getByText(/field 1/i)).toBeVisible();
    expect(screen.getByText(/field 2/i)).toBeVisible();
    expect(screen.getByText(/test 1/i)).toBeVisible();
    expect(screen.getByText(/test 2/i)).toBeVisible();
  });

  it('should render correctly with header', () => {
    render(
      <InfoContainer
        inline
        header="Horizontal fields"
        infoFields={infoFields}
      />,
    );

    expect(screen.getByText(/horizontal fields/i)).toBeVisible();
    expect(screen.getByText(/field 1/i)).toBeVisible();
    expect(screen.getByText(/field 2/i)).toBeVisible();
    expect(screen.getByText(/test 1/i)).toBeVisible();
    expect(screen.getByText(/test 2/i)).toBeVisible();
  });
});
