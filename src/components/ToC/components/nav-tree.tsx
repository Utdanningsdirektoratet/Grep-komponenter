import React, { use } from 'react';
import context from '../context';
import NavTreeNode from './nav-tree-node';
import { ContextTree } from '../utils/tree-builder';
import Box from '@mui/material/Box';
import { convertToRgba } from '../../../styling/hex2rgb';
import styles from '../styles/nav-tree.style.module.css';

interface Props {
  elements: ContextTree;
  className?: string;
  style?: React.CSSProperties;
  setSelectedValue: (selected: unknown) => void;
  percentageRendered: number;
}

const NavTree: React.FC<Props> = (props) => {
  const { elements, style, setSelectedValue, percentageRendered } = props;
  const { classes } = use(context);
  const className = `
    grep-toc__nav-tree
    ${styles.root}
    ${classes?.tree ?? ''}
    ${props.className ?? ''}
  `;
  return (
    <Box
      sx={(theme) => ({
        '--grep-toc-link-color': convertToRgba(
          theme.palette.primary.main,
          0.75,
        ),
        '--grep-toc-focused-background': convertToRgba(
          theme.palette.primary.main,
          0.1,
        ),
        '--grep-toc-selected-color': theme.palette.primary.main,
      })}
    >
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
    </Box>
  );
};

NavTree.displayName = 'Grep.ToC.NavTree';

export default NavTree;
