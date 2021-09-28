import * as React from 'react';
import { Button } from '@material-ui/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationServiceProvider, useConfirmation } from '.';

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
    const { container } = renderComponent();

    // Dialog should not render by default
    expect(screen.queryByRole('presentation')).toBeFalsy();

    // Open dialog
    userEvent.click(container.querySelector('button')!);

    // Dialog should render when opened
    expect(screen.queryByRole('presentation')).toBeVisible();

    // Dialog should contain title and description text
    expect(screen.getByText('Title text')).toBeVisible();
    expect(screen.getByText('Description text')).toBeVisible();

    const confirmBtn = screen.getByText('Confirm').parentElement;
    const cancelBtn = screen.getByText('Cancel').parentElement;

    // Dialog buttons should be visible
    expect(confirmBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();

    // Dialog buttons should be of type 'button'
    expect(confirmBtn?.getAttribute('type')).toBe('button');
    expect(cancelBtn?.getAttribute('type')).toBe('button');
  });

  it('should handle confirm', async () => {
    const { container } = renderComponent();

    // Open dialog
    userEvent.click(container.querySelector('button')!);

    // Click 'confirm'-button
    userEvent.click(screen.getByText('Confirm').parentElement!);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith('confirmed');

      // Dialog should be closed
      expect(screen.queryByRole('presentation')).toBeFalsy();
    });
  });

  it('should handle cancel', async () => {
    const { container } = renderComponent();

    // Open dialog
    userEvent.click(container.querySelector('button')!);

    // Click 'cancel'-button
    userEvent.click(screen.getByText('Cancel').parentElement!);

    await waitFor(() => {
      // Dialog should be closed
      expect(screen.queryByRole('presentation')).toBeFalsy();
    });
  });

  it("should have correct className when 'warning'-prop is true", () => {
    const { container } = renderComponent(true);

    // Open dialog
    userEvent.click(container.querySelector('button')!);

    const confirmBtn = screen.getByText('Confirm').parentElement;

    // Should include 'discard'-className when 'warning'-prop is true
    expect(confirmBtn?.className.includes('makeStyles-discard')).toBe(true);
  });
});
