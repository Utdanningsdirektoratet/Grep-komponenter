import React, { useContext, useMemo, useRef, useCallback } from 'react';
import clsx from 'clsx';

import context from '../context';
import NavTree from './nav-tree';
import { useStyles } from '../styles/nav.style';
import { buildTree } from '../utils/tree-builder';
import { Key } from '../../../assets/keycodeEnum';

export interface GrepTableOfContentNavProps {
  className?: string;
  style?: React.CSSProperties;
  setSelectedValue: (selected: unknown) => void;
  percentageRendered: number;
}

export const GrepTableOfContentNav: React.FC<GrepTableOfContentNavProps> = (
  props,
) => {
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
    if (e.key === Key.ArrowUp || e.key === Key.ArrowDown) {
      e.preventDefault();
      e.stopPropagation();
      const nodes = Object.values(elements);
      const currentIndex = nodes.indexOf(selected!);
      const moveIndex = e.key === Key.ArrowUp ? -1 : 1;
      const next = nodes[currentIndex + moveIndex];
      next && setSelected(next, true);
      focusSelected();
    }
  };

  const { classes: style } = useStyles();
  const className = clsx(
    'grep-toc__nav',
    style.root,
    classes?.nav,
    props.className,
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
