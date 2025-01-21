import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState, useRef } from '@storybook/preview-api';

import { DropdownMenuItem, DropdownMenu } from '../..';
import { tss } from '../../../styling';

interface TestMenuItem {
  label: string;
  handleClick: VoidFunction;
  disabled?: boolean;
}

export const menuItems = [
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
    tooltipText: 'This tooltip has specific placement left',
    tooltipPlacement: 'left',
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
        tooltipText: 'This tooltip is on submenu 4-1',
        tooltipPlacement: 'left',
      },
      {
        label: 'Test 4-2',
        handleClick: () => console.log('clicked 4-2'),
        tooltipText: 'This tooltip is on submenu 4-2',
        tooltipPlacement: 'left-start',
        children: [
          {
            label: 'Test 4-2-1',
            handleClick: () => console.log('clicked 4-2-1'),
          },
          {
            label: 'Test 4-2-2',
            disabled: true,
            handleClick: () => console.log('clicked 4-2-2'),
            tooltipText: 'This tooltip is on submenu 4-2-2',
            tooltipPlacement: 'left-start',
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
                    tooltipText: 'This tooltip is on subumenu 4-2-2-2-1',
                    tooltipPlacement: 'left',
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
    handleClick: () => console.log('clicked 5'),
  },
  {
    label: 'Test 6',
    disabled: true,
    tooltipText: 'This tooltip has default placement (bottom)',
    handleClick: () => console.log('clicked 6'),
    children: [
      {
        label: 'Test 6-1',
        handleClick: () => console.log('clicked 6-1'),
      },
    ],
  },
] as DropdownMenuItem<TestMenuItem>[];

export default {
  title: 'DropdownMenu',
  excludeStories: ['menuItems'],
};

export const Standard = () => {
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);
  const { classes } = tss.create({
    paper: {
      width: '200px',
    },
  })();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </Box>
  );
};

Standard.story = {
  name: 'standard',
};
