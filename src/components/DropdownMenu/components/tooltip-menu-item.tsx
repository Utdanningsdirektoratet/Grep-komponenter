import React from 'react';
import { MenuItem, MenuItemProps, Tooltip } from '@mui/material';

type Props = MenuItemProps & {
  tooltipText: string;
};

export const TooltipMenuItem: React.FC<Props> = ({
  children,
  tooltipText,
  ...props
}) => (
  <Tooltip title={tooltipText}>
    <MenuItem
      role="menuitem"
      sx={{ pointerEvents: 'inherit !important' }}
      {...props}
    >
      {children}
    </MenuItem>
  </Tooltip>
);
