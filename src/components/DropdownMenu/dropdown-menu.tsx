import React from 'react';

import Menu, { MenuProps } from '@material-ui/core/Menu';
import { MenuItemProps } from '@material-ui/core/MenuItem/MenuItem';

import CollapsableMenuItem from './collapsable-menu-item';
import useStyles from './dropdown-menu.style';

export interface DropdownMenuItem<T> extends MenuItemProps {
  label: string;
  children?: Array<DropdownMenuItem<T>>;
  handleClick: (context?: T) => void;
}
export interface DropdownMenuProps<T> extends MenuProps {
  context?: T;
  menuItems: Array<DropdownMenuItem<T>>;
}

export default <T extends any>({
  context,
  menuItems,
  ...menuProps
}: DropdownMenuProps<T>) => {
  const styles = useStyles({});

  const renderChild = (level = 0) => (
    item: DropdownMenuItem<T>,
    index: number,
  ): React.ReactNode => {
    const { label, children, handleClick, ...props } = item;
    
    props.key = `child-item-${index}`;
    props.classes = { selected: styles.selected };
    // ninja way, since rewriting existing code on lpu and admin is daunting
    props.onClick = (e: React.MouseEvent) => {
      menuProps.onClose && menuProps.onClose(e, 'backdropClick');
      handleClick(context);
    };

    return (
      <CollapsableMenuItem
        level={level}
        items={children?.map(renderChild(level + 1))}
        {...props}
      >
        <span style={{ paddingLeft: `${level * 0.5}rem` }}>{label}</span>
      </CollapsableMenuItem>
    );
  };

  return <Menu {...menuProps}>{menuItems.map(renderChild())}</Menu>;
};
