import React from 'react';
import { MenuItem, MenuItemProps, Tooltip } from '@mui/material';

type Props = Pick<MenuItemProps, 'className' | 'onMouseOver'> & {
  tooltipText: string;
};

export const TooltipMenuItem: React.FC<Props> = ({
  children,
  tooltipText,
  ...props
}) => (
  <Tooltip title={tooltipText}>
    <span>
      <MenuItem disabled {...props}>
        {children}
      </MenuItem>
    </span>
  </Tooltip>
);
