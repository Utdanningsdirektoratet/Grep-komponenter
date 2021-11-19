import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemText,
} from '@mui/material';

import { useStyles } from './styles';
import { NavigationProps } from '..';

interface Props {
  title: string;
  pages: NavigationProps[];
  style?: React.CSSProperties;
  onPageClick: (page: NavigationProps) => void;
}

const ContainedLinkList: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container} style={props.style}>
      <Typography className={classes.title}>{props.title}</Typography>
      <List style={{ padding: 0 }}>
        {props.pages.map((page) => (
          <ListItem
            button
            divider
            key={page.id}
            onClick={() => props.onPageClick(page)}
          >
            {page.linkIcon && <ListItemIcon>{page.linkIcon}</ListItemIcon>}
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContainedLinkList as React.ComponentType<Props>;
