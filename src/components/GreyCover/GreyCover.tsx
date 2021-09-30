import * as React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './greyCoverStyles';

export interface GreyCoverProps {
  elevation?: boolean;
}

const GreyCover: React.FC<GreyCoverProps> = ({ elevation, children }) => {
  const classes = useStyles({ elevation });
  return <Box className={classes.cover}>{children}</Box>;
};

export default GreyCover as React.ComponentType<GreyCoverProps>;
