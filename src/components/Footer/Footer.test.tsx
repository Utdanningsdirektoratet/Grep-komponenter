import * as React from 'react';
import { Button } from '@material-ui/core';
import { render } from '@testing-library/react';

import Footer, { FooterItem } from './Footer';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

export const footerItems: FooterItem[] = [
  {
    label: 'Test #1',
  },
  {
    label: 'Test #2',
    onClickItem: () => mockFn('Test #2'),
  },
  {
    label: 'Test #3',
    render: (renderLabel) => <Button>{renderLabel()}</Button>,
  },
];

describe('Footer', () => {
  it('should render correctly', () => {
    const { getByText, getByRole } = render(<Footer items={footerItems} />);

    expect(getByText(/test #1/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /test #2/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /test #3/i })).toBeInTheDocument();
  });

  it('should handle onClick', () => {
    const { getByRole } = render(<Footer items={footerItems} />);

    userEvent.click(getByRole('button', { name: /test #2/i }));
    expect(mockFn).toHaveBeenCalledWith('Test #2');
  });
});
