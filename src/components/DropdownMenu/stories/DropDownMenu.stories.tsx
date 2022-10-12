import * as React from 'react';
import { Button } from '@mui/material';
import { storiesOf } from '@storybook/react';
import { useState, useRef } from '@storybook/addons';

import { DropdownMenuItem, DropdownMenu } from '../..';
import { makeStyles } from '../../../styling';

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
    ],
  },
  {
    label: 'Test 2',
    disabled: true,
    tooltipText: 'This is a tooltip',
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
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Test 5',
    tooltipText: 'This is a tooltip',
    handleClick: () => console.log('clicked '),
  },
  {
    label: 'Test 4',
    disabled: true,
    tooltipText: 'This is a tooltip',
    handleClick: () => console.log('clicked '),
    children: [
      {
        label: 'Test 4-1',
        handleClick: () => console.log('clicked '),
      },
    ],
  },
];

storiesOf('DropdownMenu', module).add('standard', () => {
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);
  const { classes } = makeStyles()({
    paper: {
      width: '200px',
    },
  })();

  return (
    <div>
      <Button ref={menuAnchor} onClick={() => setOpen(!open)}>
        menu
      </Button>
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
