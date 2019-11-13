import * as React from 'react';
import { NavigationProps } from '..';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './sidebarStyles';

export interface SidebarProps {
  currentPageId?: number;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

export default (props: SidebarProps) => {
  const classes = useStyles({});

  return (
    <Box className={classes.container}>
      <List>
        {props.pages.map(page => (
          <ListItem
            key={page.id}
            className={classes.item}
            onClick={() => props.onPageClick(page)}
          >
            <ListItemText
              disableTypography
              primary={page.label}
              className={
                page.id === props.currentPageId
                  ? classes.selected
                  : classes.text
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
