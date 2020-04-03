import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import CleanPaper from '../CleanPaper';
import withStyles from '@material-ui/core/styles/withStyles';

const Inner = withStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})(CleanPaper);

interface Props extends CircularProgressProps {
  height?: number | string;
}

const CircularLoading: React.FC<Props> = ({ height, ...props }) => (
  <Inner style={{ height }}>
    <CircularProgress {...props} />
  </Inner>
);

export default CircularLoading as React.ComponentType<Props>;
