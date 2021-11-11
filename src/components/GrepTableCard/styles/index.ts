import { Box, Typography, withStyles } from '@material-ui/core';
import Colors from '../../../styling/Colors';

export const Container = withStyles({
  root: {
    border: `1px solid ${Colors.lightGrey}`,
    height: 'fit-content',
    flex: 'auto',
  },
})(Box);

export const Title = withStyles({
  root: {
    fontSize: 24,
    padding: 20,
    color: Colors.black,
  },
})(Typography);
