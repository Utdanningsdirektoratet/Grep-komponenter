import * as React from 'react';
import { StyledAppBarTop } from './appBarTopStyles';

export interface AppBarTopProps {
  children?: React.ReactNode;
}

const AppBarTop: React.FC<AppBarTopProps> = (props) => (
  <StyledAppBarTop>{props.children}</StyledAppBarTop>
);

export default AppBarTop as React.ComponentType<AppBarTopProps>;
