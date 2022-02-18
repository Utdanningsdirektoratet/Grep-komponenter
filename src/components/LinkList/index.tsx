import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import { Colors } from '../../styling';
import { NavigationProps } from '../AppBarNavList';

interface Props {
  title: string;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

const LinkList: React.FC<Props> = (props) => (
  <Box width="100%" flexDirection="column">
    <Typography style={{ fontSize: 24, color: Colors.black, marginBottom: 20 }}>
      {props.title}
    </Typography>
    <List>
      {props.pages.map((page) => (
        <Box key={page.id}>
          <ListItem
            button
            onClick={() => props.onPageClick(page)}
            style={{ padding: '12px 4px' }}
          >
            <ListItemText
              primary={page.label}
              primaryTypographyProps={{
                color: 'primary',
                style: { fontSize: 18 },
              }}
            />
            <ListItemIcon style={{ justifyContent: 'flex-end' }}>
              <ArrowForward color="primary" />
            </ListItemIcon>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  </Box>
);

export default LinkList as React.ComponentType<Props>;
