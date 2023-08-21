import React from 'react';
import { Menu, MenuItemProps, MenuProps } from '@mui/material';

import CollapsableMenuItem from './components/collapsable-menu-item';
import { useStyles } from './styles/dropdown-menu.style';

type BooleanFunction<T> = (context?: T) => boolean;

export type DropdownMenuItem<T> = Omit<MenuItemProps, 'disabled'> & {
  label: string;
  tooltipText?: string;
  disabled?: BooleanFunction<T> | boolean;
  children?: Array<DropdownMenuItem<T>>;
  handleClick?: (context?: T) => void;
};
export interface DropdownMenuProps<T> extends MenuProps {
  context?: T;
  menuItems: Array<DropdownMenuItem<T>>;
}

const DropdownMenu = <T,>({
  context,
  menuItems,
  ...menuProps
}: DropdownMenuProps<T>) => {
  const { classes } = useStyles();

  const renderChild =
    (level = 0, parentDisabled?: BooleanFunction<T> | boolean) =>
    // eslint-disable-next-line react/display-name
    (item: DropdownMenuItem<T>, index: number): React.ReactNode => {
      const { label, children, handleClick, disabled, ...props } = item;

      const itemOrParentDisabled = (parentDisabled || disabled) ?? false;

      props.key = `child-item-${index}`;
      props.classes = { selected: classes.selected };
      // ninja way, since rewriting existing code on lpu and admin is daunting
      props.onClick = (e: React.MouseEvent) => {
        if (itemOrParentDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        menuProps.onClose && menuProps.onClose(e, 'backdropClick');
        !itemOrParentDisabled && handleClick && handleClick(context);
      };

      const style = !itemOrParentDisabled
        ? { paddingLeft: `${level * 0.5}rem` }
        : {
            paddingLeft: `${level * 0.5}rem`,
            opacity: 0.4,
          };
      return (
        <CollapsableMenuItem
          sx={
            itemOrParentDisabled && !children ? { cursor: 'not-allowed' } : {}
          }
          level={level}
          id={label}
          disabled={
            itemOrParentDisabled
              ? true
              : typeof disabled === 'function'
              ? disabled(context)
              : disabled
          }
          items={children?.map(renderChild(level + 1, itemOrParentDisabled))}
          {...props}
        >
          <span style={style}>{label}</span>
        </CollapsableMenuItem>
      );
    };

  return (
    <Menu
      {...menuProps}
      anchorOrigin={
        menuProps?.anchorOrigin || {
          vertical: 'bottom',
          horizontal: 'center',
        }
      }
      transformOrigin={
        menuProps.transformOrigin || {
          vertical: 'top',
          horizontal: 'center',
        }
      }
    >
      {menuItems.map(renderChild())}
    </Menu>
  );
};

export default DropdownMenu;
