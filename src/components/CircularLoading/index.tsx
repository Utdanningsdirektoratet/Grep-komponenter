import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface Props extends CircularProgressProps {
  height?: number | string;
}

const CircularLoading: React.FC<Props> = ({ height, ...props }) => (
  <Box
    height={height}
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress {...props} />
  </Box>
);

export default CircularLoading as React.ComponentType<Props>;
