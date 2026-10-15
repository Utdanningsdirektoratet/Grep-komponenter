import React, {
  useContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from '@mui/material/Link';
import context from '../context';
import { ContextTreeElement, ContextTree } from '../utils/tree-builder';
import styles from '../styles/nav-tree-node.module.css';
import { useLocation } from 'react-router';

export interface GrepTableOfContentNavTreeNodeProps {
  node: ContextTreeElement;
  className?: string;
  style?: React.CSSProperties;
  renderChilds: (children: ContextTree) => ReactElement;
  setSelectedValue: (selected: unknown) => void;
  percentageRendered: number;
}

export const GrepTableOfContentNavTreeNode: React.FC<
  GrepTableOfContentNavTreeNodeProps
> = (props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { node, style, renderChilds, setSelectedValue, percentageRendered } =
    props;
  const { lvl, el, index, children } = node;
  const { selected, setSelected, classes, elements } = useContext(context);
  const isSelected = el === selected;
  const className = `
    grep-toc__nav-tree-node 
    ${isSelected ? styles.selected : ''} 
    ${styles.root} 
    ${classes?.node ?? ''} 
    ${props.className ?? ''} 
  `;
  const [awaitingRender, setAwaitingRender] = useState<boolean>(false);

  const txt = el.innerText;
  const location = useLocation();
  const url = `${location.pathname}${location.search}#${node.id}`;

  useEffect(() => {
    const link = linkRef.current;
    if (isSelected) {
      link?.scrollIntoView({ block: 'nearest' });
    } else if (link === document.activeElement) {
      link?.blur();
    }
  }, [isSelected, linkRef, setSelectedValue]);

  const tabIndex = isSelected ? 0 : -1;

  useEffect(() => {
    if (awaitingRender) {
      doSelect();
      setAwaitingRender(false);
    }
  }, [percentageRendered]);

  const doSelect = (checkAwaitRender = false) => {
    window.history.replaceState({}, txt, url);
    setSelected(el, true);
    const values = Object.values(elements);
    const newPercentage =
      values.findIndex((e) => e === el) / values.length + 0.1;
    setSelectedValue(newPercentage);
    if (checkAwaitRender && newPercentage > percentageRendered) {
      setAwaitingRender(true);
    }
  };

  return (
    <li key={index} data-lvl={lvl} className={className} style={style}>
      <Link
        ref={linkRef}
        className={`${styles.link} ${isSelected ? `${styles.selected}` : ''}`}
        href={url}
        tabIndex={tabIndex}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          doSelect(true);
        }}
        color="inherit"
        sx={{ marginLeft: `${lvl * 5}px` }}
      >
        {txt}
      </Link>
      {children && renderChilds(children)}
    </li>
  );
};

GrepTableOfContentNavTreeNode.displayName = 'Grep.ToC.NavTree.Node';

export default GrepTableOfContentNavTreeNode;
