import * as React from 'react';
import { render, screen } from '@testing-library/react';

import LinkList from '..';
import { NavigationProps } from '../../AppBarNavList';
import userEvent from '@testing-library/user-event';

const pages: NavigationProps[] = [
  {
    id: 1,
    label: 'Link 1',
    toUrl: '/link-1',
  },
  {
    id: 2,
    label: 'Link 2',
    toUrl: '/link-2',
  },
];

const mockFn = jest.fn();

describe('LinkList', () => {
  const user = userEvent.setup();
  it('should render correctly', () => {
    const { getByRole, getByText } = render(
      <LinkList title="Title test" pages={pages} onPageClick={mockFn} />,
    );

    expect(getByText(/title test/i)).toBeVisible();
    expect(getByRole('button', { name: /link 1/i })).toBeVisible();
    expect(getByRole('button', { name: /link 2/i })).toBeVisible();
  });

  it('should handle onPageClick', async () => {
    const { getByRole } = render(
      <LinkList title="Title test" pages={pages} onPageClick={mockFn} />,
    );

    await user.click(getByRole('button', { name: pages[0].label }));
    expect(mockFn).toHaveBeenCalledWith(pages[0]);
  });
});
