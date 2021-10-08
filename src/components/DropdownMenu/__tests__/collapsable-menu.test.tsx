import * as React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@material-ui/core';

import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu';

const items: Array<DropdownMenuItem<any>> = [
  {
    label: 'Testitem #1',
    children: [
      {
        label: 'Testitem #1.1',
      },
    ],
  },
  {
    label: 'Testitem #2',
    children: [
      {
        label: 'Testitem #2.1',
      },
    ],
  },
  {
    label: 'Testitem #3',
    disabled: true,
    tooltipText: 'tooltip text',
    children: [
      {
        label: 'Testitem #3.3',
      },
    ],
  },
];

const ButtonMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClickListItem}>Open menu</Button>
      <DropdownMenu
        anchorEl={anchorEl}
        menuItems={items}
        open={!!anchorEl}
        onClose={handleClose}
      />
    </div>
  );
};

const openMenu = () => {
  render(<ButtonMenu />);
  userEvent.tab(); // focus on button
  userEvent.keyboard('{space}'); // open
};

describe('CollapsableMenu', () => {
  it('should handle collapse/expand (mouse)', async () => {
    openMenu();
    expect(screen.queryByText('Testitem #1.1')).toBeFalsy();

    const item1 = screen.getByRole('menuitem', { name: 'Testitem #1' });
    const item2 = screen.getByRole('menuitem', { name: 'Testitem #2' });

    userEvent.click(item1);
    expect(screen.queryByText('Testitem #1.1')).toBeTruthy();

    userEvent.click(item2);
    expect(screen.queryByText('Testitem #2.1')).toBeTruthy();
    await waitForElementToBeRemoved(() => screen.queryByText('Testitem #1.1'));

    userEvent.click(item2);
    await waitForElementToBeRemoved(() => screen.queryByText('Testitem #2.1'));
  });

  it('should handle collapse/expand (keyboard)', async () => {
    openMenu();
    expect(screen.queryByText('Testitem #1.1')).toBeFalsy();

    userEvent.keyboard('{arrowright}');
    expect(screen.queryByText('Testitem #1.1')).toBeTruthy();

    userEvent.keyboard('{arrowleft}');
    await waitForElementToBeRemoved(screen.queryByText('Testitem #1.1'));

    await waitFor(() => {
      userEvent.keyboard('{arrowright}');
      expect(screen.queryByText('Testitem #1.1')).toBeTruthy();
    });

    userEvent.keyboard('{esc}');
    await waitForElementToBeRemoved(screen.queryByText('Testitem #1.1'));
  });

  it('should display tooltip text onMouseOver (if disabled)', async () => {
    openMenu();
    expect(screen.queryByText('tooltip text')).toBeFalsy();

    userEvent.hover(screen.getAllByRole('menuitem')[2]);
    expect(await screen.findByText('tooltip text')).toBeInTheDocument();
  });
});
