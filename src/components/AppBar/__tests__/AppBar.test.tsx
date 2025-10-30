import { render, screen } from '@testing-library/react';
import util from 'node:util';
const { TextEncoder } = util;
globalThis.TextEncoder = TextEncoder;
import AppBar from '../AppBar';
import { BrowserRouter } from 'react-router';
import { navbarPages, v0colors } from '../stories/AppBarStory.stories';

import React from 'react';
import userEvent from '@testing-library/user-event';

describe('AppBar', () => {
  const mockFn = jest.fn();
  const userMenuItems = [
    {
      id: 'profile',
      action: () => {
        mockFn('profile');
      },
      label: 'Profil',
    },
    {
      id: 'manual',
      href: '/test.docx',
      isAnchor: true,
      label: 'Test',
    },
    {
      id: 'logout',
      action: () => {
        mockFn('logout');
      },
      label: 'Logg ut',
    },
  ];
  const apptitle = 'Apptitle';
  const environment = 'Environment';
  const username = 'Username';

  beforeEach(() => {
    render(
      <AppBar
        environmentTitle={environment}
        username={username}
        userMenuItems={userMenuItems}
        menuItems={navbarPages}
        currentPath="/"
        appTitle={apptitle}
        colors={v0colors}
      />,
      { wrapper: BrowserRouter },
    );
  });
  it('textEncoder is globally defined for tests', () => {
    expect(global.TextEncoder).toBeDefined();
  });

  it('should render', () => {
    expect(screen.getByText(username)).toBeInTheDocument();
    const tabs = screen.getAllByRole('link');
    // Apptitle Environment is also a link
    expect(tabs.length).toBe(navbarPages.length + 1);
    tabs.forEach((tab, index) => {
      if (index === 0) {
        expect(tab).toHaveTextContent(apptitle + environment);
      } else {
        expect(tab).toHaveTextContent(
          navbarPages[index - 1].translatedTextRef as string,
        );
      }
    });
  });

  it('should handle click on link', async () => {
    const tabs = screen.getAllByRole('link').slice(1);
    const user = userEvent.setup();
    await user.click(tabs[2]);
    expect(screen.getByRole('link', { current: 'page' })).toHaveTextContent(
      navbarPages[2].translatedTextRef as string,
    );
  });

  it('should open usermenu', async () => {
    const usermenu = screen.getByRole('button', { name: username });
    const user = userEvent.setup();
    await user.click(usermenu);

    expect(screen.getAllByRole('menuitem').length).toBe(userMenuItems.length);
  });

  it('should handle click in usermenu', async () => {
    const usermenu = screen.getByRole('button', { name: username });
    const user = userEvent.setup();
    await user.click(usermenu);
    await user.click(
      screen.getByRole('menuitem', { name: userMenuItems[2].label }),
    );

    expect(mockFn).toHaveBeenCalledWith(userMenuItems[2].id);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
