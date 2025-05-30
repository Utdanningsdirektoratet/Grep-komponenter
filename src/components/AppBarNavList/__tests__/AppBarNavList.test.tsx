import React from 'react';
import util from 'node:util';
const { TextEncoder } = util;
globalThis.TextEncoder = TextEncoder;
import { render, screen } from '@testing-library/react';

import AppBarNavList from '..';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

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
      { wrapper: BrowserRouter },
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

  it('should handle selecting pages', async () => {
    const tabs = screen.getAllByRole('tab');
    const user = userEvent.setup();

    // Expect initial page (selectedPage-prop) to be selected
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    await user.click(tabs[3]);

    // Expect onChange to have been called with right args
    expect(mockFn).toHaveBeenCalledWith(pages[3].id - 1);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Expect selected page to be selected
    expect(tabs[3].getAttribute('aria-selected')).toBe('true');

    // Expect initial page (selectedPage-prop) to not be selected
    expect(tabs[0].getAttribute('aria-selected')).not.toBe('true');
  });

  it('should handle keyboard navigation', async () => {
    const tabs = screen.getAllByRole('tab');
    const user = userEvent.setup();

    await user.tab();

    // Expect initial page to have focus
    expect(tabs[0]).toHaveFocus();

    await user.keyboard('{arrowright}');
    await user.keyboard('{arrowright}');

    // Expect new page to have focus
    expect(tabs[2]).toHaveFocus();
    expect(tabs[0]).not.toHaveFocus();

    await user.keyboard('{enter}');

    // Expect selected page to be selected with 'enter'-key
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');

    // Expect onChange to have been called with right args
    expect(mockFn).toHaveBeenCalledWith(pages[2].id - 1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
