import * as React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropdown from '@material-ui/icons/ArrowDropDown';
import { Box, Button, Typography } from '@material-ui/core';

import { useStyles } from './styles';

export interface AppBarProfileProps {
  userRole: string;
  fullName: string;
  onButtonClick: (args?: any) => void;
}

const AppBarProfile: React.FC<AppBarProfileProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Button variant="text" onClick={props.onButtonClick}>
      <AccountCircle color="primary" fontSize="large" />
      <Box className={classes.user}>
        <Typography style={{ fontSize: 16 }}>
          {props.fullName || 'ukjent navn'}
        </Typography>
        <Typography style={{ fontSize: 12 }}>
          {props.userRole || 'ukjent rolle'}
        </Typography>
      </Box>
      <ArrowDropdown color="primary" />
    </Button>
  );
};

export default AppBarProfile as React.ComponentType<AppBarProfileProps>;
