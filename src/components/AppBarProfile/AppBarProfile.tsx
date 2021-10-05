import * as React from 'react';
import { UserContainer, UserName, UserRole } from './appBarProfileStyles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropdown from '@material-ui/icons/ArrowDropDown';
import { Button } from '@material-ui/core';

export interface AppBarProfileProps {
  userRole: string;
  fullName: string;
  onButtonClick: (args?: any) => void;
}

const AppBarProfile: React.FC<AppBarProfileProps> = (props) => (
  <Button variant="text" onClick={props.onButtonClick}>
    <AccountCircle color="primary" fontSize="large" />
    <UserContainer>
      <UserName>{props.fullName || 'ukjent navn'}</UserName>
      <UserRole>{props.userRole || 'ukjent rolle'}</UserRole>
    </UserContainer>
    <ArrowDropdown color="primary" />
  </Button>
);

export default AppBarProfile as React.ComponentType<AppBarProfileProps>;
