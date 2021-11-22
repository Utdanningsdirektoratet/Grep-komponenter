import * as React from 'react';
import { Button } from '@mui/material';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationServiceProvider, useConfirmation } from '..';

const mockFn = jest.fn();

const Component: React.FC<{ warning?: boolean }> = ({ warning }) => {
  const confirm = useConfirmation();

  const handleClick = () => {
    confirm({
      title: 'Title text',
      description: 'Description text',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      warning,
    }).then(() => mockFn('confirmed'));
  };

  return <Button onClick={handleClick}>Open dialog</Button>;
};

const renderComponent = (warning?: boolean) =>
  render(
    <ConfirmationServiceProvider>
      <Component warning={warning} />
    </ConfirmationServiceProvider>,
  );

describe('ConfirmationDialog', () => {
  it('should render correctly', async () => {
    const { getByRole, getByText } = renderComponent();

    // Dialog should not render by default
    expect(screen.queryByRole('dialog')).toBeFalsy();

    userEvent.click(getByRole('button', { name: /open dialog/i }));

    // Dialog should render when opened
    expect(getByRole('dialog')).toBeVisible();

    // Dialog should contain title and description text
    expect(getByText('Title text')).toBeVisible();
    expect(getByText('Description text')).toBeVisible();

    // Dialog buttons should be visible
    expect(getByRole('button', { name: /confirm/i })).toBeVisible();
    expect(getByRole('button', { name: /cancel/i })).toBeVisible();
  });

  it('should handle confirm', async () => {
    const { getByRole } = renderComponent();

    userEvent.click(getByRole('button', { name: /open dialog/i }));

    userEvent.click(getByRole('button', { name: /confirm/i }));

    await waitForElementToBeRemoved(() => getByRole('dialog'));

    expect(mockFn).toHaveBeenCalledWith('confirmed');
  });

  it('should handle cancel', async () => {
    const { getByRole } = renderComponent();

    userEvent.click(getByRole('button', { name: /open dialog/i }));

    userEvent.click(getByRole('button', { name: /cancel/i }));

    await waitForElementToBeRemoved(() => getByRole('dialog'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it("should have correct className when 'warning'-prop is true", () => {
    const { getByRole } = renderComponent(true);

    userEvent.click(getByRole('button', { name: /open dialog/i }));

    const confirmBtn = getByRole('button', { name: /confirm/i });

    expect(confirmBtn.className).toContain('discard');
  });
});
