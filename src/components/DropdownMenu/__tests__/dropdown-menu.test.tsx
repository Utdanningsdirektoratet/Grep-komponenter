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

  /*it('should open and close using keyboard', async () => {
    const { getByRole } = render(<ButtonMenu />);
    const user = userEvent.setup();

    await user.tab(); // focus on button
    expect(getByRole('button')).toHaveFocus();

    await user.keyboard('[Space]'); // open menu with 'space'-key
    expect(getByRole('menu', { hidden: true })).toBeVisible();

    await user.keyboard('[Esc]'); // close menu with 'escape'-key
    expect(getByRole('menu', { hidden: true })).not.toBeVisible();

    await user.keyboard('[Enter]'); // open menu with 'enter'-key
    expect(getByRole('menu', { hidden: true })).toBeVisible();
  });*/

  /*it('should handle keyboard navigation', async () => {
    openMenu();
    const menuItems = screen.queryAllByRole('menuitem');
    let user = userEvent.setup();

    // navigate down to menuitem #3 (skip disabled menuitems)
    await user.keyboard('[ArrowDown]');
    expect(menuItems[2]).toHaveFocus();
    expect(menuItems[0]).not.toHaveFocus();
    expect(menuItems[1]).not.toHaveFocus();

    // navigate up to menuitem #1 (skip disabled menuitems)
    await user.keyboard('[ArrowUp]');
    expect(menuItems[0]).toHaveFocus();
    expect(menuItems[1]).not.toHaveFocus();
    expect(menuItems[2]).not.toHaveFocus();

    // navigate into menuitem #1.1
    await user.keyboard('[ArrowRight]');
    expect(
      screen.getByRole('menuitem', { name: 'MenuItem #1.1' }),
    ).toHaveFocus();

    await waitFor(async () => {
      // navigate back to menuitem #1
      await user.keyboard('[ArrowLeft]');
      expect(menuItems[0]).toHaveFocus();
      expect(
        screen.queryByRole('menuitem', { name: 'MenuItem #1.1' }),
      ).toBeFalsy();
    });
  });*/

  it('should close on select', async () => {
    const menu = openMenu();
    const user = userEvent.setup();

    // navigate down to menuitem #3
    await user.keyboard('[ArrowDown]');

    await waitFor(async () => {
      // close on select, check that 'handleClick' is called
      await user.keyboard('[Enter]');
      expect(menu).not.toBeVisible();
      //expect(mockFunc).toHaveBeenCalledWith('MenuItem #3');
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
  });

  it('should not render menu items when closed', () => {
    const menuItems = screen.queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(0);
  });
});
