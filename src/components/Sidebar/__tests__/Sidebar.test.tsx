import * as React from 'react';
import { Assignment } from '@material-ui/icons';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Sidebar, { SidebarProps } from '..';
import { NavigationProps } from '../../AppBarNavList';

const pages: NavigationProps[] = [
  {
    id: 1,
    label: 'Page 1',
    toUrl: '/page1',
  },
  {
    id: 2,
    label: 'Page 2',
    children: [
      {
        id: 3,
        label: 'Page 2.1',
        linkIcon: <Assignment data-testid="linkIconTest" />,
      },
    ],
  },
];

const mockFn = jest.fn();

const Component: React.FC<Partial<SidebarProps>> = (props) => {
  const [pageId, setPageId] = React.useState(props.currentPageId || 1);

  return (
    <Sidebar
      pages={pages}
      currentPageId={pageId}
      onPageClick={(page) => {
        setPageId(page.id);
        mockFn(page);
      }}
    />
  );
};

describe('Sidebar', () => {
  it('should render correctly (collapsed)', () => {
    const { getByText, getAllByRole, queryByText } = render(<Component />);

    expect(getAllByRole('listitem')).toHaveLength(2);

    expect(getByText(pages[0].label)).toBeVisible();
    expect(getByText(pages[1].label)).toBeVisible();
    expect(queryByText(pages[1].children![0].label)).toBeFalsy();
    expect(screen.queryByTestId('linkIconTest')).toBeFalsy();
  });

  it('should render correctly (expanded)', () => {
    const { getByText, getAllByRole } = render(<Component currentPageId={3} />);

    expect(getAllByRole('listitem')).toHaveLength(3);

    expect(getByText(pages[0].label)).toBeVisible();
    expect(getByText(pages[1].label)).toBeVisible();
    expect(getByText(pages[1].children![0].label)).toBeVisible();
    expect(getByText(pages[1].children![0].label).className).toContain(
      'selected',
    );
    expect(screen.getByTestId('linkIconTest')).toBeVisible();
  });

  it('should handle expand/collapse', async () => {
    const { getByText, getAllByRole, queryByText } = render(<Component />);

    expect(getAllByRole('listitem')).toHaveLength(2);

    // Expand page 2
    userEvent.click(getByText(pages[1].label));
    expect(getAllByRole('listitem')).toHaveLength(3);

    // Collapse page 2
    userEvent.click(getByText(pages[1].label));
    await waitForElementToBeRemoved(() =>
      queryByText(pages[1].children![0].label),
    );
    expect(getAllByRole('listitem')).toHaveLength(2);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should handle click selection', () => {
    const { getByText } = render(<Component currentPageId={3} />);

    userEvent.click(getByText(pages[0].label));
    expect(mockFn).toHaveBeenCalledWith(pages[0]);

    userEvent.click(getByText(pages[1].children![0].label));
    expect(mockFn).toHaveBeenCalledWith(pages[1].children![0]);
  });

  it('should handle keyboard selection', () => {
    const { getByText } = render(<Component />);

    userEvent.tab();
    userEvent.keyboard('{enter}');
    expect(mockFn).toHaveBeenCalledWith(pages[0]);
    expect(getByText(pages[0].label).className).toContain('selected');

    userEvent.tab();
    userEvent.keyboard('{enter}');
    userEvent.tab();
    userEvent.keyboard('{enter}');

    expect(mockFn).toHaveBeenCalledWith(pages[1].children![0]);
    expect(getByText(pages[1].children![0].label).className).toContain(
      'selected',
    );
  });
});
