import React, { useContext } from 'react';
import clsx from 'clsx';

import context from '../context';
import NavTreeNode from './nav-tree-node';
import { ContextTree } from '../utils/tree-builder';
import useStyles from '../styles/nav-tree.style';

interface Props {
  elements: ContextTree;
  className?: string;
  style?: React.CSSProperties;
}

const NavTree: React.FC<Props> = (props) => {
  const { elements, style } = props;
  const { classes } = useContext(context);
  const styles = useStyles({});
  const className = clsx(
    'grep-toc__nav-tree',
    styles.root,
    classes?.tree,
    props.className,
  );
  return (
    <ul className={className} style={style}>
      {Object.values(elements).map((node) => (
        <NavTreeNode
          node={node}
          key={node.index}
          renderChilds={(children) => <NavTree elements={children} />}
        />
      ))}
    </ul>
  );
};

NavTree.displayName = 'Grep.ToC.NavTree';

export default NavTree;
