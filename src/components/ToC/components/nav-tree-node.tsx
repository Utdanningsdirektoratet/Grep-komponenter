import React, { useContext, ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { replace, getLocation } from 'connected-react-router';

import context from '../context';
import { ContextTreeElement, ContextTree } from '../utils/tree-builder';

import Link from '@material-ui/core/Link';

import { useStyles } from './nav-tree-node.style';
import clsx from 'clsx';

/**
 * @TODO fix later
 * cheat, https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
 */

declare global {
  interface HTMLElement {
    scrollIntoViewIfNeeded: VoidFunction;
  }
}

export interface GrepTableOfContentNavTreeNodeProps {
  node: ContextTreeElement;
  className?: string;
  style?: React.CSSProperties;
  renderChilds: (children: ContextTree) => ReactElement;
}

export const GrepTableOfContentNavTreeNode: React.FC<GrepTableOfContentNavTreeNodeProps> = (
  props,
) => {
  const ref = useRef<HTMLLIElement>(null);

  const dispatch = useDispatch();

  const { node, style, renderChilds } = props;
  const { lvl, el, index, children } = node;
  const { selected, setSelected, classes } = useContext(context);
  const isSelected = el === selected;
  const styles = useStyles({ lvl });
  const className = clsx(
    'grep-toc__nav-tree-node',
    isSelected && 'grep-toc__nav-tree-node--selected',
    styles.root,
    classes?.node,
    props.className,
  );

  const txt = el.innerText;
  const location = useSelector((s) => getLocation(s as any));
  const url = `${location.pathname}${location.search}#${node.id}`;

  useEffect(() => {
    isSelected && ref.current && ref.current.scrollIntoViewIfNeeded();
  }, [isSelected, ref]);

  const tabIndex = isSelected ? 0 : -1;

  return (
    <li
      key={index}
      data-lvl={lvl}
      className={className}
      style={style}
      ref={ref}
    >
      <Link
        className={clsx(styles.link, isSelected && `${styles.link}--selected`)}
        href={url}
        tabIndex={tabIndex}
        onClick={(event: React.MouseEvent) => {
          console.debug('node click', node);
          event.preventDefault();
          event.stopPropagation();
          dispatch(replace(url));
          setSelected(el, true);
        }}
        color="inherit"
      >
        {txt}
      </Link>
      {children && renderChilds(children)}
    </li>
  );
};

GrepTableOfContentNavTreeNode.displayName = 'Grep.ToC.NavTree.Node';

export default GrepTableOfContentNavTreeNode;
