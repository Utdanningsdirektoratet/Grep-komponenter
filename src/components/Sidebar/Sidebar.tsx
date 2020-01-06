import * as React from 'react';
import { NavigationProps } from '..';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './sidebarStyles';
import { keyboard } from '../../utils';

export interface SidebarProps {
  currentPageId?: number;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

export default ({ pages, onPageClick, currentPageId }: SidebarProps) => {
  const classes = useStyles({});

  return (
    <Box className={classes.container}>
      <List>
        {pages.map(page => (
          <ListItem
            key={page.id}
            tabIndex={0}
            className={classes.item}
            onClick={() => onPageClick(page)}
            onKeyPress={keyboard.onActivation(() => onPageClick(page))}
          >
            <ListItemText
              tabIndex={-1}
              disableTypography
              primary={page.label}
              className={
                page.id === currentPageId ? classes.selected : classes.text
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
