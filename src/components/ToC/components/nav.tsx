import React, { useContext, useMemo } from 'react';

import context from '../context';

import NavTree from './nav-tree';

import { useStyles } from '../component.style';
import { buildTree } from '../utils/tree-builder';
import clsx from 'clsx';

export interface GrepTableOfContentNavProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GrepTableOfContentNav: React.FC<GrepTableOfContentNavProps> = (
  props,
) => {
  const { elements, classes } = useContext(context);
  const tree = useMemo(() => buildTree(Object.values(elements)), [elements]);
  const style = useStyles({});
  const className = clsx(
    'grep-toc__nav',
    style.root,
    classes?.nav,
    props.className,
  );
  return (
    <nav className={className} style={props.style}>
      <NavTree elements={tree}></NavTree>
    </nav>
  );
};

GrepTableOfContentNav.displayName = 'Grep.ToC.Nav';

export default GrepTableOfContentNav;
