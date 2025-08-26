import { render, screen, waitFor } from '@testing-library/react';
import util from 'node:util';
const { TextEncoder } = util;
globalThis.TextEncoder = TextEncoder;

import React from 'react';
import userEvent from '@testing-library/user-event';
import { v0colors } from '../stories/NavGuard.stories';
import { Box } from '@mui/material';
import { createRoutesStub, useLocation } from 'react-router';
import NavGuard, { NavGuardProperties } from '..';
import { navbarPages } from '../../AppBar/stories/AppBarStory.stories';
import AppBar from '../../AppBar/AppBar';

describe('AppBar', () => {
  const mockFn = jest.fn();
  const txtCancel = 'Cancel';
  const txtSave = 'Save';
  const txtDiscard = 'Discard';
  const current = 'Current location: ';
  const confirm = 'Confirm navigation';

  const Component = () => {
    const props: NavGuardProperties = {
      when: true,
      exclude: [
        { current: '/metadata', next: '/admin' },
        { current: '/admin', next: '/metadata' },
      ],
      title: confirm,
      txt: 'You have created or unstored data, leaving this page will discard all changes!',
      txtDiscard: txtDiscard,
      txtCancel: txtCancel,
      txtSave: txtSave,
      onSave: () => mockFn(txtSave),
      onDiscard: () => mockFn(txtDiscard),
      onCancel: () => mockFn(txtCancel),
    };
    const location = useLocation();
    return (
      <Box display="flex" flexDirection="column">
        <NavGuard {...props} />
        <AppBar
          appTitle="apptitle"
          environmentTitle={'Unittests'}
          colors={v0colors}
          currentPath="/"
          menuItems={navbarPages}
          userMenuItems={[]}
          username="Grep bruker"
          userRole="something"
        />
        <h1>{current + location.pathname}</h1>
      </Box>
    );
  };

  const Stub = createRoutesStub(
    navbarPages.map((n) => ({
      path: n.path,
      Component: Component,
    })),
  );

  beforeEach(() => {
    render(<Stub initialEntries={['/']} />);
  });

  it('should render', async () => {
    const openButton = screen.getByRole('link', {
      name: navbarPages[1].translatedTextRef,
    });
    const user = userEvent.setup();
    await user.click(openButton);
    expect(screen.getByRole('dialog', { name: confirm })).toBeDefined();
  });

  it('should not change location on cancel', async () => {
    const openButton = screen.getByRole('link', {
      name: navbarPages[1].translatedTextRef,
    });
    const user = userEvent.setup();
    await user.click(openButton);
    await user.click(screen.getByRole('button', { name: txtCancel }));
    expect(
      screen.getByRole('heading', { name: current + navbarPages[0].path }),
    ).toBeDefined();
  });
  it('should close dialog on click', async () => {
    const openButton = screen.getByRole('link', {
      name: navbarPages[1].translatedTextRef,
    });
    const user = userEvent.setup();
    await user.click(openButton);
    await user.click(screen.getByRole('button', { name: txtCancel }));
    expect(screen.queryByRole('dialog', { name: confirm })).toBeDefined();
  });

  it('should change location', async () => {
    const openButton = screen.getByRole('link', {
      name: navbarPages[1].translatedTextRef,
    });
    const user = userEvent.setup();
    await user.click(openButton);
    await user.click(screen.getByRole('button', { name: txtDiscard }));
    expect(screen.queryByRole('dialog', { name: confirm })).toBeNull();
  });

  it('should not popup for excluded routes', async () => {
    const link = screen.getByRole('link', {
      name: navbarPages[2].translatedTextRef,
    });
    const user = userEvent.setup();
    await user.click(link);
    expect(screen.queryByRole('dialog', { name: confirm })).toBeNull();
  });
});
