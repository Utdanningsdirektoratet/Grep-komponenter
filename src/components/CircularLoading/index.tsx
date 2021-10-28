import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { Box, withStyles } from '@material-ui/core';

const Inner = withStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(Box);

interface Props extends CircularProgressProps {
  height?: number | string;
}

const CircularLoading: React.FC<Props> = ({ height, ...props }) => (
  <Inner style={{ height }}>
    <CircularProgress {...props} />
  </Inner>
);

export default CircularLoading as React.ComponentType<Props>;
