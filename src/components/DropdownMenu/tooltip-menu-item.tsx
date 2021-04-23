import React from 'react';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { MenuItemProps, Tooltip, withStyles } from '@material-ui/core';

type Props = Pick<MenuItemProps, 'className' | 'onMouseOver'> & {
  tooltipText: string;
};

const MenuItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'unset',
    },
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
})(MuiMenuItem);

export const TooltipMenuItem: React.FC<Props> = ({
  children,
  tooltipText,
  ...other
}) => {
  const props = {
    ...other,
    disabled: true,
    component: 'div',
  };

  return (
    <Tooltip title={tooltipText}>
      <MenuItem {...props}>{children}</MenuItem>
    </Tooltip>
  );
};
