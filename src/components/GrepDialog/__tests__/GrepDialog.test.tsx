import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import userEvent from '@testing-library/user-event';
import { GrepDialogServiceProvider } from '..';
import Button from '@mui/material/Button';
import { Component, content, openText, title } from '../stories/dialog.stories';

describe('AppBar', () => {
  const action1 = 'Extra action 1';
  const action2 = 'Extra action 2';
  const buttons = [
    <Button key={action1}>{action1}</Button>,
    <Button key={action2}>{action2}</Button>,
  ];

  beforeEach(() => {
    render(
      <GrepDialogServiceProvider>
        <Component actions={buttons} />
      </GrepDialogServiceProvider>,
    );
  });

  it('should render', async () => {
    const openButton = screen.getByRole('button', { name: openText });
    const user = userEvent.setup();
    await user.click(openButton);

    expect(screen.getByRole('dialog', { name: title })).toBeDefined();
    expect(screen.getByText(content)).toBeDefined();
  });

  it('should render extra buttons', async () => {
    const openButton = screen.getByRole('button', { name: openText });
    const user = userEvent.setup();
    await user.click(openButton);

    expect(screen.getByRole('button', { name: action1 })).toBeDefined();
    expect(screen.getByRole('button', { name: action2 })).toBeDefined();
  });

  it('should close', async () => {
    const openButton = screen.getByRole('button', { name: openText });
    const user = userEvent.setup();
    await user.click(openButton);

    const closeButton = screen.getByRole('button', { name: /Lukk/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: title })).toBeNull();
    });
  });
});
