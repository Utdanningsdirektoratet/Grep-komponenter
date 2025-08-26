import React, { PropsWithChildren, FunctionComponent } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Collapse, MenuList } from '@mui/material';
import { Key } from '../../../assets/keycodeEnum';

interface Properties extends TransitionProps {
  className?: string;
  onMenuClose?: VoidFunction;
}

export const CollapsableMenu: FunctionComponent<
  PropsWithChildren<Properties>
> = ({ children, onMenuClose, ...collapseProps }) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.Escape:
        onMenuClose && onMenuClose();
        return;
      case Key.ArrowLeft:
        onMenuClose && onMenuClose();
    }
    e.stopPropagation();
  };
  return (
    <Collapse timeout="auto" unmountOnExit mountOnEnter {...collapseProps}>
      <MenuList disablePadding autoFocusItem onKeyDown={onKeyDown}>
        {children}
      </MenuList>
    </Collapse>
  );
};

export default CollapsableMenu;
