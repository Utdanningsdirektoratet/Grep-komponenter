import * as React from 'react';
import { Box } from '@mui/material';
import { useStyles } from './styles';

export interface GreyCoverProps {
  elevation?: boolean;
  children?: React.ReactNode;
}

const GreyCover: React.FC<GreyCoverProps> = ({ elevation, children }) => {
  const { classes } = useStyles({ elevation });
  return <Box className={classes.cover}>{children}</Box>;
};

export default GreyCover as React.ComponentType<GreyCoverProps>;
