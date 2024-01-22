import React from 'react';
import { Menu, MenuItemProps, MenuProps } from '@mui/material';

import CollapsableMenuItem from './components/collapsable-menu-item';
import { useStyles } from './styles/dropdown-menu.style';

type BooleanFunction<T> = (context?: T) => boolean;

export type TooltipPlacement =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom-end'
  | 'bottom-start'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start'
  | 'top-end'
  | 'top-start'
  | undefined;

export type DropdownMenuItem<T> = Omit<MenuItemProps, 'disabled'> & {
  label: string;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
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

      const isDisabled =
        typeof itemOrParentDisabled === 'function'
          ? itemOrParentDisabled(context)
          : itemOrParentDisabled;

      const style = isDisabled
        ? { paddingLeft: `${level * 0.5}rem`, opacity: 0.4 }
        : {
            paddingLeft: `${level * 0.5}rem`,
          };

      props.key = `child-item-${index}`;
      props.classes = { selected: classes.selected };
      // ninja way, since rewriting existing code on lpu and admin is daunting
      props.onClick = (e: React.MouseEvent) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        menuProps.onClose && menuProps.onClose(e, 'backdropClick');
        !isDisabled && handleClick && handleClick(context);
      };

      return (
        <CollapsableMenuItem
          sx={isDisabled && !children ? { cursor: 'not-allowed' } : {}}
          level={level}
          id={label}
          disabled={isDisabled}
          items={children?.map(renderChild(level + 1, isDisabled))}
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
