import * as React from 'react';
import { Container, UserContainer, UserName, UserRole } from './styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropdown from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton/IconButton';

export interface AppBarProfileProps {
  userRole: string;
  fullName: string;
  onButtonClick: (args?: any) => void;
}

const AppBarProfile: React.FC<AppBarProfileProps> = (props) => (
  <Container>
    <AccountCircle color="primary" />
    <UserContainer>
      <UserName>{props.fullName || 'ukjent navn'}</UserName>
      <UserRole>{props.userRole || 'ukjent rolle'}</UserRole>
    </UserContainer>
    <IconButton color="primary" onClick={props.onButtonClick}>
      <ArrowDropdown />
    </IconButton>
  </Container>
);

export default AppBarProfile as React.ComponentType<AppBarProfileProps>;
