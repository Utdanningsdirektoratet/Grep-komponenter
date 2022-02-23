import React, { useContext } from 'react';
import clsx from 'clsx';

import context from '../context';
import NavTreeNode from './nav-tree-node';
import { ContextTree } from '../utils/tree-builder';
import { useStyles } from '../styles/nav-tree.style';

interface Props {
  elements: ContextTree;
  className?: string;
  style?: React.CSSProperties;
  setSelectedValue: (selected: any) => void;
  percentageRendered: number;
}

const NavTree: React.FC<Props> = (props) => {
  const { elements, style, setSelectedValue, percentageRendered } = props;
  const { classes } = useContext(context);
  const { classes: styles } = useStyles();
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
          renderChilds={(children) => (
            <NavTree
              elements={children}
              setSelectedValue={setSelectedValue}
              percentageRendered={percentageRendered}
            />
          )}
          setSelectedValue={setSelectedValue}
          percentageRendered={percentageRendered}
        />
      ))}
    </ul>
  );
};

NavTree.displayName = 'Grep.ToC.NavTree';

export default NavTree;
