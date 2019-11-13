import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MenuItem, DropdownMenu } from '..';

interface MenuItem {
  label: string;
  handleClick: VoidFunction;
}
export const menuItems: MenuItem<MenuItem>[] = [
  {
    label: 'Test 1',
    handleClick: () => console.log('clicked '),
  },
  {
    label: 'Test 2',
    disabled: true,
    handleClick: () => console.log('clicked '),
  },
  {
    label: 'Test 3',
    handleClick: () => console.log('clicked '),
  },
];

storiesOf('DropdownMenu', module).add('standard', () => (
  <DropdownMenu
    menuOpen
    menuAnchor={null}
    menuItems={menuItems}
    onMenuClose={() => console.log('closing menu')}
  />
));
