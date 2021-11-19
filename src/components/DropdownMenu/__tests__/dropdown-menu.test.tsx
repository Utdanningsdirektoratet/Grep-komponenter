import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@mui/material';

import DropdownMenu, { DropdownMenuItem } from '..';

const mockFunc = jest.fn();

const items: DropdownMenuItem<any>[] = [
  {
    label: 'MenuItem #1',
    children: [
      {
        label: 'MenuItem #1.1',
      },
    ],
  },
  {
    label: 'MenuItem #2',
    disabled: true,
  },
  {
    label: 'MenuItem #3',
    handleClick: () => mockFunc('MenuItem #3'),
  },
  {
    label: 'MenuItem #4',
    disabled: () => true,
  },
];

const ButtonMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleOpenMenu}>Open menu</Button>
      <DropdownMenu
        anchorEl={anchorEl}
        menuItems={items}
        open={!!anchorEl}
        onClose={handleClose}
      />
      <p>Outside</p>
    </div>
  );
};

const openMenu = () => {
  const { getByRole } = render(<ButtonMenu />);

  getByRole('button').click();

  return getByRole('menu', { hidden: true });
};

describe('DropdownMenu', () => {
  it('should not be visible when closed', () => {
    render(<ButtonMenu />);
    expect(screen.queryByRole('menu')).toBeFalsy();
  });

  it('should be visible when open', () => {
    const menu = openMenu();
    expect(menu).toBeVisible();
  });

  it('should open and close using keyboard', () => {
    const { getByRole } = render(<ButtonMenu />);

    userEvent.tab(); // focus on button
    expect(getByRole('button')).toHaveFocus();

    userEvent.keyboard('{space}'); // open menu with 'space'-key
    expect(getByRole('menu', { hidden: true })).toBeVisible();

    userEvent.keyboard('{esc}'); // close menu with 'escape'-key
    expect(getByRole('menu', { hidden: true })).not.toBeVisible();

    userEvent.keyboard('{enter}'); // open menu with 'enter'-key
    expect(getByRole('menu', { hidden: true })).toBeVisible();
  });

  it('should handle keyboard navigation', async () => {
    openMenu();
    const menuItems = screen.queryAllByRole('menuitem');

    // navigate down to menuitem #3 (skip disabled menuitems)
    userEvent.keyboard('{arrowdown}');
    expect(menuItems[2]).toHaveFocus();
    expect(menuItems[0]).not.toHaveFocus();
    expect(menuItems[1]).not.toHaveFocus();

    // navigate up to menuitem #1 (skip disabled menuitems)
    userEvent.keyboard('{arrowup}');
    expect(menuItems[0]).toHaveFocus();
    expect(menuItems[1]).not.toHaveFocus();
    expect(menuItems[2]).not.toHaveFocus();

    // navigate into menuitem #1.1
    userEvent.keyboard('{arrowright}');
    expect(
      screen.getByRole('menuitem', { name: 'MenuItem #1.1' }),
    ).toHaveFocus();

    await waitFor(() => {
      // navigate back to menuitem #1
      userEvent.keyboard('{arrowleft}');
      expect(menuItems[0]).toHaveFocus();
      expect(
        screen.queryByRole('menuitem', { name: 'MenuItem #1.1' }),
      ).toBeFalsy();
    });
  });

  it('should close on select', async () => {
    const menu = openMenu();

    // navigate down to menuitem #3
    userEvent.keyboard('{arrowdown}');

    await waitFor(() => {
      // close on select, check that 'handleClick' is called
      userEvent.keyboard('{enter}');
      expect(menu).not.toBeVisible();
      expect(mockFunc).toHaveBeenCalledWith('MenuItem #3');
    });
  });

  it('should render menuitems correctly when open', () => {
    openMenu();
    const menuItems = screen.queryAllByRole('menuitem');

    // check that number of items is correct
    expect(menuItems).toHaveLength(items.length);

    // check that items have correct label
    menuItems.forEach((item, index) => {
      expect(item).toHaveTextContent(items[index].label);
    });

    // check that items get correct disabled-attribute
    menuItems.forEach((item, index) => {
      let disabled = item.getAttribute('aria-disabled');
      expect(disabled).toBe(items[index].disabled ? 'true' : 'false');
    });
  });

  it('should not render menu items when closed', () => {
    const menuItems = screen.queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(0);
  });
});
