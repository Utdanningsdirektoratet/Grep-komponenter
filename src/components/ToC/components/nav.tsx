import React, {
  useContext,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import { Key } from 'ts-keycode-enum';

import context from '../context';
import NavTree from './nav-tree';
import { useStyles } from '../styles/nav.style';
import { buildTree } from '../utils/tree-builder';

export interface GrepTableOfContentNavProps {
  className?: string;
  style?: React.CSSProperties;
  setSelectedValue: (selected: any) => void;
  percentageRendered: number;
}

export const GrepTableOfContentNav: React.FC<GrepTableOfContentNavProps> = (
  props,
) => {
  const [showKeyboardHint, setShowKeyboardHint] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const { elements, classes, selected, setSelected } = useContext(context);
  const tree = useMemo(() => buildTree(Object.values(elements)), [elements]);

  const focusSelected = useCallback(() => {
    requestAnimationFrame(() => {
      if (!(ref.current instanceof HTMLElement)) return;
      const active = ref.current.querySelector('[tabindex="0"]');
      if (active instanceof HTMLElement) {
        active.focus();
      } else {
        ref.current.focus();
      }
    });
  }, [ref]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (selected && e.which === Key.Tab && e.shiftKey === false) {
      const tabindex = selected.getAttribute('tabindex');
      selected.setAttribute('tabindex', '0');
      selected.focus();
      requestAnimationFrame(() => {
        tabindex === null
          ? selected.removeAttribute('tabindex')
          : selected.setAttribute('tabindex', tabindex);
      });
    }
    if ([Key.UpArrow, Key.DownArrow].includes(e.which)) {
      e.preventDefault();
      e.stopPropagation();
      const nodes = Object.values(elements);
      const currentIndex = nodes.indexOf(selected!);
      const moveIndex = e.which === Key.UpArrow ? -1 : 1;
      const next = nodes[currentIndex + moveIndex];
      next && setSelected(next, true);
      focusSelected();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.keyCode === Key.Alt && setShowKeyboardHint(true);
      if (e.altKey) {
        e.keyCode === Key.I && focusSelected();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      e.keyCode === Key.Alt && setShowKeyboardHint(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [focusSelected]);

  const { classes: style } = useStyles();
  const className = clsx(
    'grep-toc__nav',
    style.root,
    classes?.nav,
    props.className,
    showKeyboardHint && style.keyboardHint,
  );

  return (
    <nav
      className={className}
      style={props.style}
      tabIndex={selected ? -1 : 0}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      <NavTree
        elements={tree}
        setSelectedValue={props.setSelectedValue}
        percentageRendered={props.percentageRendered}
      ></NavTree>
    </nav>
  );
};

GrepTableOfContentNav.displayName = 'Grep.ToC.Nav';

export default GrepTableOfContentNav;
