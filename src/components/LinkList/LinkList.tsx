import * as React from 'react';
import { Title } from './linkListStyles';
import { NavigationProps } from '..';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
} from '@material-ui/core';

import { ArrowForward } from '@material-ui/icons';

interface Props {
  title: string;
  pages: NavigationProps[];
  onPageClick: (page: NavigationProps) => any;
}

const LinkList: React.FC<Props> = props => (
  <Box width="100%" flexDirection="column">
    <Title>{props.title}</Title>
    <List>
      {props.pages.map(page => (
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
