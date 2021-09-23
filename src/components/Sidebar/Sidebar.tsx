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
  const [expanded, setExpanded] = React.useState<number[]>([]);
  const classes = useStyles({});

  React.useEffect(() => {
    if (currentPageId) {
      const pageId = pages.find((p) =>
        p.children?.some((c) => c.id === currentPageId),
      )?.id;

      !!pageId && setExpanded([...expanded, pageId]);
    }
  }, [pages]);

  const toggleExpand = (id: number) => {
    if (expanded.includes(id)) {
      setExpanded([...expanded.filter((_id) => _id !== id)]);
    } else {
      setExpanded([...expanded, id]);
    }
  };

  const handleClick = (page: NavigationProps) => {
    page.children ? toggleExpand(page.id) : onPageClick(page);
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
              {page.children ? (
                expanded.includes(page.id) ? (
                  <ExpandMore />
                ) : (
                  <ExpandLess />
                )
              ) : null}
            </ListItem>

            <Collapse
              in={expanded.includes(page.id)}
              timeout="auto"
              unmountOnExit
            >
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
