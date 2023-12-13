import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { render, screen } from '@testing-library/react';
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
        linkIcon: <AssignmentIcon data-testid="linkIconTest" />,
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
  const user = userEvent.setup();
  it('should render correctly (collapsed)', () => {
    render(<Component />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(screen.getByText(pages[0].label)).toBeVisible();
    expect(screen.getByText(pages[1].label)).toBeVisible();
    expect(screen.queryByText(pages[1].children![0].label)).toBeFalsy();
    expect(screen.queryByTestId('linkIconTest')).toBeFalsy();
  });

  it('should render correctly (expanded)', () => {
    render(<Component currentPageId={3} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    expect(screen.getByText(pages[0].label)).toBeVisible();
    expect(screen.getByText(pages[1].label)).toBeVisible();
    expect(screen.getByText(pages[1].children![0].label)).toBeVisible();
    expect(screen.getByText(pages[1].children![0].label).className).toContain(
      'selected',
    );
    expect(screen.getByTestId('linkIconTest')).toBeVisible();
  });

  it('should handle expand/collapse', async () => {
    render(<Component />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    // Expand page 2
    await user.click(screen.getByText(pages[1].label));
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    // Collapse page 2
    await user.click(screen.getByText(pages[1].label));
    var testitem1 = screen.queryByText(pages[1].children![0].label);
    if (testitem1) {
      await !screen.getByText(pages[1].children![0].label);
    }

    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should handle click selection', async () => {
    const { getByText } = render(<Component currentPageId={3} />);

    await user.click(getByText(pages[0].label));
    expect(mockFn).toHaveBeenCalledWith(pages[0]);

    await user.click(getByText(pages[1].children![0].label));
    expect(mockFn).toHaveBeenCalledWith(pages[1].children![0]);
  });

  it('should handle keyboard selection', async () => {
    render(<Component />);

    await user.tab();
    await user.keyboard('{enter}');
    expect(mockFn).toHaveBeenCalledWith(pages[0]);
    expect(screen.getByText(pages[0].label).className).toContain('selected');

    await user.tab();
    await user.keyboard('{enter}');
    await user.tab();
    await user.keyboard('{enter}');

    expect(mockFn).toHaveBeenCalledWith(pages[1].children![0]);
    expect(screen.getByText(pages[1].children![0].label).className).toContain(
      'selected',
    );
  });
});
