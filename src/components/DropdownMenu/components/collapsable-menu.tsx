import React, { PropsWithChildren, FunctionComponent } from 'react';

import { Key } from 'ts-keycode-enum';

import { Collapse, MenuList, StandardProps } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { CollapseClassKey } from '@material-ui/core/Collapse';

interface Properties extends StandardProps<TransitionProps, CollapseClassKey> {
  onMenuClose?: VoidFunction;
}

export const CollapsableMenu: FunctionComponent<PropsWithChildren<
  Properties
>> = ({ children, onMenuClose, ...collapseProps }) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.keyCode) {
      case Key.Escape:
        onMenuClose && onMenuClose();
        return;
      case Key.LeftArrow:
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
