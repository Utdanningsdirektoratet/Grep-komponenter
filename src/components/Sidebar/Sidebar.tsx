import * as React from 'react';
import { NavigationProps } from '..';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './sidebarStyles';
import { keyboard } from '../../utils';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Collapse, ListItemIcon } from '@material-ui/core';

export interface SidebarProps {
  currentPageId?: number;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

export default ({ pages, onPageClick, currentPageId }: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles({});

  const handleClick = (page: NavigationProps) => {
    page.children ? setIsOpen(!isOpen) : onPageClick(page);
  };

  const renderItem = (page: NavigationProps) => (
    <React.Fragment>
      {page.linkIcon && (
        <ListItemIcon className={classes.icon}>{page.linkIcon}</ListItemIcon>
      )}
      <ListItemText
        tabIndex={-1}
        disableTypography
        primary={page.label}
        className={page.id === currentPageId ? classes.selected : classes.text}
      />
    </React.Fragment>
  );

  return (
    <Box className={classes.container}>
      <List>
        {pages.map((page) => (
          <div key={page.id}>
            <ListItem
              key={page.id}
              tabIndex={0}
              className={classes.item}
              onClick={() => handleClick(page)}
              onKeyPress={keyboard.onActivation(() => handleClick(page))}
            >
              {renderItem(page)}
              {page.children ? isOpen ? <ExpandMore /> : <ExpandLess /> : null}
            </ListItem>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {page.children?.map((child) => (
                  <ListItem
                    key={child.id}
                    style={{ paddingLeft: '30px' }}
                    tabIndex={0}
                    className={classes.item}
                    onClick={() => handleClick(child)}
                    onKeyPress={keyboard.onActivation(() => handleClick(child))}
                  >
                    {renderItem(child)}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Box>
  );
};
