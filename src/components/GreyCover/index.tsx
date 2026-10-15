import * as React from 'react';
import { Box } from '@mui/material';

export interface GreyCoverProps {
  elevation?: boolean;
  children?: React.ReactNode;
}

const GreyCover: React.FC<GreyCoverProps> = ({ elevation, children }) => {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.grey.A200,
        marginBottom: '12px',
        padding: '10px 0',
        boxShadow: elevation
          ? `0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);`
          : 'none',
      })}
    >
      {children}
    </Box>
  );
};

export default GreyCover as React.ComponentType<GreyCoverProps>;
