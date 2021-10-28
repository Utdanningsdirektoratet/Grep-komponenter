import * as React from 'react';
import { render, screen } from '@testing-library/react';

import AppBarNavList from '..';
import userEvent from '@testing-library/user-event';

const pages = [
  {
    id: 1,
    label: 'Hjem',
    toUrl: '/home',
  },
  {
    id: 2,
    label: 'Læreplaner',
    toUrl: '/curriculums',
  },
  {
    id: 3,
    label: 'Metadata',
    toUrl: '/metadata',
  },
  {
    id: 4,
    label: 'Administrasjon',
    toUrl: '/admin',
  },
];

describe('AppBarNavList', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    render(
      <AppBarNavList
        pages={pages}
        onChange={(id) => mockFn(id)}
        selectedPage={0}
      />,
    );
  });

  it('should render correctly', () => {
    const tabs = screen.getAllByRole('tab');

    // header tabs have correct length
    expect(tabs.length).toBe(pages.length);

    // header tabs have correct label
    tabs.forEach((tab, index) => {
      expect(tab).toHaveTextContent(pages[index].label);
    });
  });

  it('should handle selecting pages', () => {
    const tabs = screen.getAllByRole('tab');

    // Expect initial page (selectedPage-prop) to be selected
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    userEvent.click(tabs[3]);

    // Expect onChange to have been called with right args
    expect(mockFn).toHaveBeenCalledWith(pages[3].id - 1);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Expect selected page to be selected
    expect(tabs[3].getAttribute('aria-selected')).toBe('true');

    // Expect initial page (selectedPage-prop) to not be selected
    expect(tabs[0].getAttribute('aria-selected')).not.toBe('true');
  });

  it('should handle keyboard navigation', () => {
    const tabs = screen.getAllByRole('tab');

    userEvent.tab();

    // Expect initial page to have focus
    expect(tabs[0]).toHaveFocus();

    userEvent.keyboard('{arrowright}');
    userEvent.keyboard('{arrowright}');

    // Expect new page to have focus
    expect(tabs[2]).toHaveFocus();
    expect(tabs[0]).not.toHaveFocus();

    userEvent.keyboard('{enter}');

    // Expect selected page to be selected with 'enter'-key
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');

    // Expect onChange to have been called with right args
    expect(mockFn).toHaveBeenCalledWith(pages[2].id - 1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
