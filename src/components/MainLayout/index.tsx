import * as React from 'react';
import { Box } from '@material-ui/core';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => (
  <Box display="flex" flex="1" flexDirection="column">
    {props.children}
  </Box>
);

export default MainLayout as React.ComponentType<MainLayoutProps>;
