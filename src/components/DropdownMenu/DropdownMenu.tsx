import * as React from 'react';
import {
  Menu,
  MenuItem,
  Collapse,
  List,
  ListItemText,
} from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export interface MenuItem<T> extends MenuItemProps {
  label: string;
  children?: Array<MenuItem<T>>;
  handleClick: (context?: T) => void;
}
export interface DropdownMenuProps<T> {
  context?: T;
  menuOpen: boolean;
  menuItems: Array<MenuItem<T>>;
  menuAnchor: HTMLElement | null;
  onMenuClose: () => void;
}

export default <T extends any>({
  menuAnchor,
  menuItems,
  menuOpen,
  context,
  ...props
}: DropdownMenuProps<T>) => {
  const [expandedItem, setExpandedItem] = React.useState<number | null>(null);

  const _onExpandItem = (index: number) => {
    const expanded = expandedItem === index;
    setExpandedItem(expanded ? null : index);

    window.requestAnimationFrame(() =>
      window.dispatchEvent(new Event('resize')),
    );
  };

  const _onItemClicked = (index: number, cIndex?: number) => {
    setExpandedItem(null);
    props.onMenuClose();

    if (cIndex != null) {
      menuItems[index].children![cIndex].handleClick(context);
    } else {
      menuItems[index].handleClick(context);
    }
  };

  const _onClose = () => {
    setExpandedItem(null);
    props.onMenuClose();
  };

  const _renderChildren = (children: Array<MenuItem<T>>, index: number) => (
    <Collapse in={expandedItem === index} timeout="auto" unmountOnExit>
      <List disablePadding>
        {children.map((child, cIndex) => {
          const { style, button, handleClick, ...rest } = child;

          return (
            <MenuItem
              {...rest}
              key={cIndex}
              style={{ paddingLeft: '50px' }}
              onClick={() => _onItemClicked(index, cIndex)}
            >
              <ListItemText>{child.label}</ListItemText>
            </MenuItem>
          );
        })}
      </List>
    </Collapse>
  );

  const _renderExpandIcon = (index: number) => {
    return expandedItem === index ? <ExpandLess /> : <ExpandMore />;
  };

  return (
    <Menu open={menuOpen} anchorEl={menuAnchor} onClose={_onClose}>
      {menuItems.map((item, index) => {
        const { children, button, handleClick, ...rest } = item;

        return (
          <div key={index}>
            <MenuItem
              {...rest}
              onClick={
                children
                  ? () => _onExpandItem(index)
                  : () => _onItemClicked(index)
              }
            >
              <ListItemText>{item.label}</ListItemText>
              {children && _renderExpandIcon(index)}
            </MenuItem>
            {children && _renderChildren(children, index)}
          </div>
        );
      })}
    </Menu>
  );
};
