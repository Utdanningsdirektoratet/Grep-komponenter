import * as React from 'react';
import { Button } from '@mui/material';
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
    handleClick: () => console.log('clicked 1'),
    children: [
      {
        label: 'Test 1-1',
        handleClick: () => console.log('clicked 1-1'),
      },
    ],
  },
  {
    label: 'Test 2',
    disabled: () => true,
    tooltipText: 'This is a tooltip',
    handleClick: () => console.log('clicked 2'),
  },
  {
    label: 'Test 3',
    disabled: false,
    handleClick: () => console.log('clicked 3'),
  },
  {
    label: 'Test 4',
    handleClick: () => console.log('clicked 4'),
    children: [
      {
        label: 'Test 4-1',
        handleClick: () => console.log('clicked 4-1'),
      },
      {
        label: 'Test 4-2',
        handleClick: () => console.log('clicked 4-2'),
        children: [
          {
            label: 'Test 4-2-1',
            handleClick: () => console.log('clicked 4-2-1'),
          },
          {
            label: 'Test 4-2-2',
            disabled: true,
            handleClick: () => console.log('clicked 4-2-2'),
            children: [
              {
                label: 'Test 4-2-2-1',
                handleClick: () => console.log('clicked 4-2-2-1'),
              },
              {
                label: 'Test 4-2-2-2',
                handleClick: () => console.log('clicked 4-2-2-2'),
                children: [
                  {
                    label: 'Test 4-2-2-2-1',
                    handleClick: () => console.log('clicked 4-2-2-2-1'),
                  },
                ],
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
    handleClick: () => console.log('clicked 5'),
  },
  {
    label: 'Test 6',
    disabled: true,
    tooltipText: 'This is a tooltip',
    handleClick: () => console.log('clicked 6'),
    children: [
      {
        label: 'Test 6-1',
        handleClick: () => console.log('clicked 6-1'),
      },
    ],
  },
];

export default {
  title: 'DropdownMenu',
  excludeStories: ['menuItems'],
};

export const Standard = () => {
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
};

Standard.story = {
  name: 'standard',
};
