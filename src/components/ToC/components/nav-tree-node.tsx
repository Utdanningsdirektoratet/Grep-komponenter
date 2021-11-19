import React, {
  useContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getLocation } from 'connected-react-router';
import { useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

import context from '../context';
import { ContextTreeElement, ContextTree } from '../utils/tree-builder';
import { useStyles } from '../styles/nav-tree-node.style';

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
  setSelectedValue: (selected: any) => void;
  percentageRendered: number;
}

export const GrepTableOfContentNavTreeNode: React.FC<GrepTableOfContentNavTreeNodeProps> =
  (props) => {
    const linkRef = useRef<HTMLLIElement>(null);

    const { node, style, renderChilds, setSelectedValue, percentageRendered } =
      props;
    const { lvl, el, index, children } = node;
    const { selected, setSelected, classes, elements } = useContext(context);
    const isSelected = el === selected;
    const styles = useStyles({ lvl });
    const className = clsx(
      'grep-toc__nav-tree-node',
      isSelected && 'grep-toc__nav-tree-node--selected',
      styles.root,
      classes?.node,
      props.className,
    );
    const [awaitingRender, setAwaitingRender] = useState<boolean>(false);

    const txt = el.innerText;
    const location = useSelector((s) => getLocation(s as any));
    const url = `${location.pathname}${location.search}#${node.id}`;

    useEffect(() => {
      const link = linkRef.current;
      if (isSelected) {
        link?.scrollIntoViewIfNeeded();
        //setTimeout(() => link?.scrollIntoViewIfNeeded(), 2000);
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
          className={clsx(
            styles.link,
            isSelected && `${styles.link}--selected`,
          )}
          href={url}
          tabIndex={tabIndex}
          onClick={(event: React.MouseEvent) => {
            console.debug('node click', node);
            event.preventDefault();
            event.stopPropagation();
            doSelect(true);
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
