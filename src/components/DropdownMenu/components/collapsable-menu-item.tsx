import React, {
  PropsWithChildren,
  useState,
  FunctionComponent,
  useRef,
  useCallback,
  useEffect,
  BaseSyntheticEvent,
} from 'react';

import { Key } from 'ts-keycode-enum';

import IconExpand from '@mui/icons-material/ExpandMore';
import { Box, MenuItem, MenuItemProps, Tooltip } from '@mui/material';

import { CollapsableMenu } from './collapsable-menu';

import { useStyles } from '../styles/collapsable-menu-item.style';
import { TooltipPlacement } from '..';

/**
 * TypeError: Failed to construct 'CustomEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function.
 * hack to make React emulate event
 *
 * export class CollapsableMenuStatusEvent extends CustomEvent<React.Ref<any>> {}
 */
class CollapsableMenuStatusEvent {
  private _defaultPrevented?: boolean;
  public get defaultPrevented(): boolean {
    return !!this._defaultPrevented;
  }

  constructor(
    public type: ToggleState,
    public currentTarget: React.Ref<unknown>,
  ) {}

  public preventDefault(): void {
    this._defaultPrevented = true;
  }
}

export type ToggleState = 'collapse' | 'expand';

export interface Properties extends Omit<MenuItemProps, 'button'> {
  items?: React.ReactNode;
  tooltipText?: string;
  tooltipPlacement?: TooltipPlacement;
  onClose?: (event: CollapsableMenuStatusEvent) => void;
  level: number;
}

export const CollapsableMenuItem: FunctionComponent<
  PropsWithChildren<Properties>
> = ({
  items,
  onClick,
  children,
  onClose: _onclose,
  tooltipText,
  tooltipPlacement,
  disabled,
  ...props
}) => {
  const listItemRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onStatusChange = useCallback(
    (type: ToggleState) => new CollapsableMenuStatusEvent(type, listItemRef),
    [listItemRef],
  );

  const expand = useCallback(() => {
    const event = onStatusChange('expand');
    !event.defaultPrevented && setOpen(true);
    return !event.defaultPrevented;
  }, [onStatusChange, setOpen]);

  const collapse = useCallback(() => {
    const event = onStatusChange('collapse');
    if (!event.defaultPrevented) {
      setOpen(false);
      requestAnimationFrame(() => listItemRef.current?.focus());
    }
    return !event.defaultPrevented;
  }, [onStatusChange, setOpen, listItemRef]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (items) {
      switch (e.keyCode) {
        case Key.RightArrow:
          if (expand()) {
            e.preventDefault();
            e.stopPropagation();
          }
          break;
      }
    }
  };

  const onToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      open ? collapse() : expand();
    },
    [open, collapse, expand],
  );

  const onScrimClick = useCallback(
    (e: MouseEvent) => {
      const scrimClick = !listItemRef.current?.contains(e.target as Node);
      scrimClick && collapse();
    },
    [listItemRef, collapse],
  );

  const handleClick = items ? onToggleClick : onClick;

  useEffect(() => {
    document.addEventListener('click', onScrimClick, { capture: true });
    return () => document.removeEventListener('click', onScrimClick);
  }, [listItemRef, onScrimClick]);

  const { classes } = useStyles({ open });

  const renderInner = () => (
    <Box display="flex" flexDirection="column" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        minHeight={48}
      >
        {children}
        {items && <IconExpand className={classes.expander} />}
      </Box>
      {items && (
        <CollapsableMenu
          className={classes.subMenu}
          in={open}
          onMenuClose={collapse}
          onEntered={() =>
            requestAnimationFrame(() =>
              window.dispatchEvent(new Event('resize')),
            )
          }
        >
          {items}
        </CollapsableMenu>
      )}
    </Box>
  );

  return tooltipText ? (
    <Tooltip title={tooltipText} placement={tooltipPlacement} arrow>
      <MenuItem
        role="menuitem"
        sx={
          disabled && !items
            ? { cursor: 'not-allowed', pointerEvents: 'inherit !important' }
            : { pointerEvents: 'inherit !important' }
        }
        className={classes.root}
        onMouseOver={(e: React.BaseSyntheticEvent) => e.currentTarget.focus()}
        selected={open}
        ref={listItemRef}
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        {renderInner()}
      </MenuItem>
    </Tooltip>
  ) : (
    <MenuItem
      sx={disabled && !items ? { cursor: 'not-allowed' } : {}}
      className={classes.root}
      onMouseOver={(e: BaseSyntheticEvent) => e.currentTarget.focus()}
      ref={listItemRef}
      selected={open}
      onClick={handleClick}
      onKeyDown={handleKey}
      {...props}
    >
      {renderInner()}
    </MenuItem>
  );
};

export default CollapsableMenuItem;
