import * as React from 'react';
import { Box } from '@material-ui/core';

export interface BodyLayoutProps {
  children?: React.ReactNode;
}

const BodyLayout: React.FC<BodyLayoutProps> = (props) => (
  <Box
    width="100%"
    paddingTop="20px"
    display="flex"
    flexDirection="row"
    marginBottom="20px"
    justifyContent="space-between"
  >
    {props.children}
  </Box>
);

export default BodyLayout as React.ComponentType<BodyLayoutProps>;
