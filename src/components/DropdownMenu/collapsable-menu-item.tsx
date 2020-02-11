import React, {
  PropsWithChildren,
  useState,
  FunctionComponent,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import { Key } from 'ts-keycode-enum';

import Box from '@material-ui/core/Box';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import IconExpand from '@material-ui/icons/ExpandMore';

import { CollapsableMenu } from './collapsable-menu';

import useStyle from './collapsable-menu-item.style';

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

  constructor(public type: ToggleState, public currentTarget: React.Ref<any>) {}

  public preventDefault(): void {
    this._defaultPrevented = true;
  }
}

export type ToggleState = 'collapse' | 'expand';

export interface Properties extends Omit<MenuItemProps, 'button'> {
  items?: React.ReactNode;
  onToggle?: (event: CollapsableMenuStatusEvent) => void;
  onClose?: (event: CollapsableMenuStatusEvent) => void;
  level: number;
}

export const CollapsableMenuItem: FunctionComponent<PropsWithChildren<
  Properties
>> = React.forwardRef<HTMLLIElement, PropsWithChildren<Properties>>(
  ({ items, onClick, children, onClose, onToggle, level, ...props }, ref) => {
    const listItemRef = useRef<HTMLElement>();
    const [open, setOpen] = useState<boolean>(false);

    const onStatusChange = useCallback(
      (type: ToggleState) => new CollapsableMenuStatusEvent(type, listItemRef),
      [listItemRef],
    );

    const expand = useCallback(() => {
      const event = onStatusChange('expand');
      onToggle && onToggle(event);
      !event.defaultPrevented && setOpen(true);
      return !event.defaultPrevented;
    }, [onToggle, onStatusChange, setOpen]);

    const collapse = useCallback(() => {
      const event = onStatusChange('collapse');
      onToggle && onToggle(event);
      if (!event.defaultPrevented) {
        setOpen(false);
        requestAnimationFrame(() => listItemRef.current?.focus());
      }
      return !event.defaultPrevented;
    }, [onToggle, onStatusChange, setOpen, listItemRef]);

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
      document.addEventListener('click', onScrimClick);
      return () => document.removeEventListener('click', onScrimClick);
    }, [listItemRef, onScrimClick]);

    const styles = useStyle({ open, indent: level });

    return (
      <MenuItem
        className={styles.root}
        innerRef={listItemRef}
        selected={open}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKey}
        {...props}
      >
        <Box display="flex" flexDirection="column" width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            minHeight={48}
          >
            {children}
            {items && <IconExpand className={styles.expander} />}
          </Box>
          {items && (
            <CollapsableMenu
              className={styles.subMenu}
              in={open}
              onMenuClose={collapse}
            >
              {items}
            </CollapsableMenu>
          )}
        </Box>
      </MenuItem>
    );
  },
);

export default CollapsableMenuItem;
