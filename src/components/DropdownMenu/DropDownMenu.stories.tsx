import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DropdownMenuItem, DropdownMenu } from '..';
import { useState, useRef } from '@storybook/addons';
import { Button, createStyles, makeStyles } from '@material-ui/core';

interface TestMenuItem {
  label: string;
  handleClick: VoidFunction;
  disabled?: boolean;
}
export const menuItems: DropdownMenuItem<TestMenuItem>[] = [
  {
    label: 'Test 1',
    handleClick: () => console.log('clicked '),
    children: [
      {
        label: 'Test 3-1',
        handleClick: () => console.log('clicked '),
      },
    ]
  },
  {
    label: 'Test 2',
    disabled: true,
    handleClick: () => console.log('clicked '),
  },
  {
    label: 'Test 2',
    handleClick: () => console.log('clicked '),
  },
  {
    label: 'Test 3',
    handleClick: () => console.log('clicked '),
    children: [
      {
        label: 'Test 3-1',
        handleClick: () => console.log('clicked '),
      },
      {
        label: 'Test 3-2',
        handleClick: () => console.log('clicked '),
        children: [
          {
            label: 'Test 3-1',
            handleClick: () => console.log('clicked '),
          },
          {
            label: 'Test 3-2',
            handleClick: () => console.log('clicked '),
            children: [
              {
                label: 'Test 3-1',
                handleClick: () => console.log('clicked '),
              },
              {
                label: 'Test 3-2',
                handleClick: () => console.log('clicked '),
              },
            ]
          },
        ]
      },
    ]
  },
];

storiesOf('DropdownMenu', module).add('standard', () => {
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);
  const classes = makeStyles(createStyles({
    paper: {
      width: '200px'
    }
  }))({});
  return (
    <div>
      <Button ref={menuAnchor} onClick={() => setOpen(!open)}>menu</Button>
      <DropdownMenu
        open={open}
        anchorEl={menuAnchor.current}
        menuItems={menuItems}
        onClose={() => setOpen(false)}
        classes={classes}
      />
    </div>
  );
});
