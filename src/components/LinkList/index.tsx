import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { Colors } from '../../styling';
import { NavigationProps } from '../AppBarNavList';
import { ListItemButton } from '@mui/material';

interface Props {
  title: string;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => unknown;
}

const LinkList: React.FC<Props> = (props) => (
  <Box width="100%" flexDirection="column">
    <Typography style={{ fontSize: 24, color: Colors.black, marginBottom: 20 }}>
      {props.title}
    </Typography>
    <List>
      {props.pages.map((page) => (
        <Box key={page.id}>
          <ListItemButton
            onClick={() => props.onPageClick(page)}
            style={{ padding: '12px 4px' }}
          >
            <ListItemText
              primary={page.label}
              slotProps={{
                primary: {
                  color: 'primary',
                  style: { fontSize: 18 },
                }
              }}
            />
            <ListItemIcon style={{ justifyContent: 'flex-end' }}>
              <ArrowForward color="primary" />
            </ListItemIcon>
          </ListItemButton>
          <Divider />
        </Box>
      ))}
    </List>
  </Box>
);

export default LinkList as React.ComponentType<Props>;
