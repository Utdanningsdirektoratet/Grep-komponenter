import * as React from 'react';
import { NavigationProps } from '..';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './sidebarStyles';
import { keyboard } from '../../utils';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';

export interface SidebarProps {
  currentPageId?: number;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

export default ({ pages, onPageClick, currentPageId }: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles({});


  const handleClick = (page: NavigationProps) => {
    page.children ?
      setIsOpen(!isOpen)
      : onPageClick(page)
  }

  return (
    <Box className={classes.container}>
      <List>
        {pages.map(page => (
          <div key={page.id}>
            <ListItem
              key={page.id}
              tabIndex={0}
              className={classes.item}
              onClick={() => handleClick(page)}
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
              {page.children
                ? isOpen
                  ? <ExpandMore /> : <ExpandLess />
                : null}
            </ListItem>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {page.children?.map(child => (
                  <ListItem
                  style={{paddingLeft: "20px"}}
                    key={page.id}
                    tabIndex={0}
                    className={classes.item}
                    onClick={() => handleClick(page)}
                    onKeyPress={keyboard.onActivation(() => onPageClick(child))}>
                    <ListItemText
                      tabIndex={-1}
                      disableTypography
                      primary={child.label}
                      className={
                        child.id === currentPageId ? classes.selected : classes.text
                      }
                    />
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
