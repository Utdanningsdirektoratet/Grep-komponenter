import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AppBarProfile from '..';

describe('AppBarProfile', () => {
  const mockFn = jest.fn();
  const user = userEvent.setup();

  const renderAppBarProfile = (userRole?: string, fullName?: string) => {
    render(
      <AppBarProfile
        userRole={userRole!}
        fullName={fullName!}
        onButtonClick={mockFn}
      />,
    );
  };

  it('should render correctly', () => {
    renderAppBarProfile('userRoleTest', 'fullNameTest');

    const button = document.querySelector('button');

    expect(button).toBeVisible();
    expect(screen.getByText('userRoleTest')).toBeVisible();
    expect(screen.getByText('fullNameTest')).toBeVisible();
  });

  it('should render default values', () => {
    renderAppBarProfile();

    expect(screen.getByText('ukjent navn')).toBeVisible();
    expect(screen.getByText('ukjent rolle')).toBeVisible();
  });

  it('should handle button click', async () => {
    renderAppBarProfile();

    const button = document.querySelector('button')!;

    await user.click(button);
    await user.click(button);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
