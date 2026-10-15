import * as React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropdown from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Typography } from '@mui/material';
import classes from './styles/appBarProfile.module.css';

export interface AppBarProfileProps {
  userRole: string;
  fullName: string;
  onButtonClick: (args?: unknown) => void;
}

const AppBarProfile: React.FC<AppBarProfileProps> = (props) => {
  return (
    <Button variant="text" onClick={props.onButtonClick}>
      <AccountCircle color="primary" fontSize="large" />
      <Box
        sx={(theme) => ({ color: theme.palette.text.primary })}
        className={classes.user}
      >
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
