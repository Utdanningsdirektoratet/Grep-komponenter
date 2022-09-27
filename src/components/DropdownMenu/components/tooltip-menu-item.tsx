import React from 'react';
import { MenuItem, MenuItemProps, Tooltip } from '@mui/material';

type Props = MenuItemProps & {
  tooltipText: string;
};

export const TooltipMenuItem: React.FC<Props> = ({
  children,
  tooltipText,
  disabled,
  ...props
}) => (
  <Tooltip title={tooltipText}>
    <span>
      <MenuItem role="menuitem" disabled={disabled} {...props}>
        {children}
      </MenuItem>
    </span>
  </Tooltip>
);
