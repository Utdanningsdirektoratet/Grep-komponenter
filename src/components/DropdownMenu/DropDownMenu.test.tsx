import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownMenu, { DropdownMenuItem } from './dropdown-menu';
import { Button } from '@material-ui/core';

interface TestMenuItem {
  label: string;
  handleClick: VoidFunction;
  disabled?: boolean;
}

const mockFunc = jest.fn();

const items: DropdownMenuItem<TestMenuItem>[] = [
  {
    label: 'Testitem #1',
    handleClick: () => mockFunc('Testitem #1'),
  },
  {
    label: 'Testitem #2',
    disabled: true,
  },
  {
    label: 'Testitem #3',
  },
];

const ButtonMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // console.log('closing');
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClickListItem}>Open menu</Button>
      <DropdownMenu
        anchorEl={anchorEl}
        menuItems={items}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      />
      <span>Outside</span>
    </div>
  );
};

const openMenu = () => {
  const { getByRole } = render(<ButtonMenu />);

  getByRole('button').click();

  return getByRole('menu', { hidden: true });
};

it('should not be visible when closed', () => {
  const { getByRole } = render(<ButtonMenu />);
  expect(getByRole('menu', { hidden: true })).not.toBeVisible();
});

it('should be visible when open', () => {
  const menu = openMenu();
  expect(menu).toBeVisible();
});

it('should open and close using keyboard', () => {
  const { getByRole } = render(<ButtonMenu />);

  // focus on button
  userEvent.tab();
  expect(getByRole('button')).toHaveFocus();

  // open menu with 'space'-key
  userEvent.keyboard('{space}');
  expect(getByRole('menu', { hidden: true })).toBeVisible();

  // close menu with 'escape'-key
  userEvent.keyboard('{esc}');
  expect(getByRole('menu', { hidden: true })).not.toBeVisible();

  // open menu with 'enter'-key
  userEvent.keyboard('{enter}');
  expect(getByRole('menu', { hidden: true })).toBeVisible();
});

it('should handle keyboard navigation', () => {
  openMenu();
  const menuItems = screen.queryAllByRole('menuitem');

  // navigate down to menuitem #3 (skip disabled menuitem #2)
  userEvent.keyboard('{arrowdown}');
  expect(menuItems[2]).toHaveFocus();
  expect(menuItems[0]).not.toHaveFocus();
  expect(menuItems[1]).not.toHaveFocus();

  // navigate up to first menuitem (skip disabled menuitem #2)
  userEvent.keyboard('{arrowup}');
  expect(menuItems[0]).toHaveFocus();
  expect(menuItems[1]).not.toHaveFocus();
  expect(menuItems[2]).not.toHaveFocus();

  // close on select, check that 'handleClick' is called
  userEvent.keyboard('{enter}');
  expect(screen.queryByRole('menu', { hidden: true })).not.toBeVisible();
  expect(mockFunc).toHaveBeenCalledWith('Testitem #1');
});

// TODO
// it('should close on click outside', async () => {
//   const menu = openMenu();

//   userEvent.click(document.body);
//   userEvent.click(screen.getByText('Outside'));

//   await waitFor(() => {
//     expect(menu).not.toBeVisible();
//   });
// });

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
