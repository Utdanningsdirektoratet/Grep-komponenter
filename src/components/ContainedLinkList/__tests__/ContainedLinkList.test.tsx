import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Inbox from '@mui/icons-material/Inbox';

import ContainedLinkList from '..';
import { NavigationProps } from '../../AppBarNavList';

const pages: NavigationProps[] = [
  {
    id: 1,
    label: 'Testpage #1',
    toUrl: '/test1',
  },
  {
    id: 2,
    label: 'Testpage #2',
    toUrl: '/test2',
    linkIcon: <Inbox data-testid="testIcon" />,
  },
];

const mockFn = jest.fn();

describe('ContainedLinkList', () => {
  it('should render correctly', () => {
    const { getAllByRole } = render(
      <ContainedLinkList
        title="List title"
        pages={pages}
        onPageClick={({ id }) => mockFn(id)}
      />,
    );

    expect(screen.getByText('List title')).toBeVisible();
    expect(screen.getByTestId('testIcon')).toBeVisible();

    const buttons = getAllByRole('button');
    expect(buttons.length).toEqual(pages.length);

    buttons.forEach((btn, index) => {
      expect(btn.textContent).toEqual(pages[index].label);

      userEvent.click(btn);
      expect(mockFn).toHaveBeenCalledWith(pages[index].id);
    });
  });
});
